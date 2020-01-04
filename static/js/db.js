window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

const db_name = "log";
const object_store_name = "log_data";
let db_version = 1;
let db = null;

function openDB(){
    let req = indexedDB.deleteDatabase(db_name);
    req.onsuccess = open_new_db;
    req.onerror = open_new_db;
    req.onblocked = open_new_db;
}

function open_new_db(event){
    console.log("remove result",event);
    let request = indexedDB.open(db_name,db_version);
    request.onerror = function(event){
        console.log(event)
    }
    request.onsuccess = function(event){
        console.log(event)
    }
    request.onupgradeneeded = db_upgrade;
}

function db_upgrade(event){
    let database = event.target.result;
    let object_store = database.createObjectStore(object_store_name,{keyPath:"data_time"});
    object_store.createIndex("data_time","data_time",{unique:true});
    object_store.transaction.oncomplete = function(event){
        db = database;
        console.log("upgrade",db)
    }
}


function sotore_data_in_db(log_data){
    return new Promise(function(resolve,reject){
        let transaction = db.transaction(object_store_name,"readwrite").objectStore(object_store_name);        
        let request = transaction.add({
            data_time: log_data.data_time,
            data: log_data.data
        });
        request.onsuccess = function(event){
            resolve(true);
        }
        request.onerror = function(event){
            reject(false);
        }
    });
}

function get_exact_data_from_db(time){
    return new Promise(function(resolve,reject){
        db.transaction(object_store_name).objectStore(object_store_name).get(time).onsuccess = function(event) {
            console.log("Name for SSN 444-44-4444 is " , event.target.result);
            resolve("some")
        };
    })
}

function get_range_data_from_db(start_time,end_time){
    let boundKeyRange = IDBKeyRange.bound(start_time,end_time);
    return new Promise(function(resolve,reject){
        let data = [];
        let objectStore = db.transaction(object_store_name,"readonly").objectStore(object_store_name);  
        let index = objectStore.index("data_time");
        let transaction = index.openCursor(boundKeyRange);
        let cursor;
        transaction.oncomplete = function(event){
            console.log("transaction finished")
        }
        transaction.onsuccess = function(event){
            cursor = event.target.result;
            if (cursor){
                data.push(JSON.parse(JSON.stringify(cursor.value)));
                cursor.continue();
            }else{
                resolve(data);
            }
        }
        transaction.onerror = function(event){
            reject(null);
        }
    });
}


function get_closest_data_from_db( time ){
    let befor = null;
    let after = null;
    let befor_diff = null;
    let after_diff = null;
    return new Promise(function (resolve,reject){
        let lower_bound = IDBKeyRange.lowerBound(time);
        let upper_bound = IDBKeyRange.upperBound(time);
        let objectStore = db.transaction(object_store_name,"readonly").objectStore(object_store_name);  
        let index = objectStore.index("data_time");
        let transaction = index.openCursor(lower_bound);
        transaction.onsuccess = function(event){
            cursor = event.target.result;
            if (cursor){
                after = JSON.parse(JSON.stringify(cursor.value));
                after_diff = after==null ? null : Math.abs(time-after.data_time);
            }
            second_transaction = index.openCursor(upper_bound);
            second_transaction.onsuccess = function(event){
                cursor = event.target.result;
                if (cursor){
                    befor = JSON.parse(JSON.stringify(cursor.value));
                    befor_diff = befor==null ? null : Math.abs(time-befor.data_time);
                }
                if (befor_diff == null && after_diff == null){
                    reject(null);
                } else if (befor_diff == null) {
                    resolve(after)
                } else if (after_diff == null) {
                    resolve(befor)
                } else {
                    resolve(befor_diff < after_diff ? befor : after);
                }
            }
        }
    })   
}



function remote_get_data_from_db(start_border, bridge_func ,is_reverse){
    return new Promise(function (resolve,reject){
        let bound = null;
        if (is_reverse){
            bound = IDBKeyRange.upperBound(start_border);
        } else {
            bound = IDBKeyRange.lowerBound(start_border);
        }
        let objectStore = db.transaction(object_store_name,"readonly").objectStore(object_store_name);  
        let index = objectStore.index("data_time");
        let transaction = index.openCursor(bound);
        transaction.onsuccess = function(event){
            let cursor = event.target.result;
            if(cursor && bridge_func(JSON.parse(JSON.stringify(cursor.value)))){
                cursor.continue();
            } else {
                resolve(true);
            }
        }
    });
}

openDB();