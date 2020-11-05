const list_restaurants = [
    {
        rOwnerRate: "John Doe",
        rName: "Restaurant 1",
        rType: "Bar",
        rAddress: "Demo",
        date_time: "10/10/2020 10:30 PM",
        avgCost: 300000,
        ratingForService: 2,
        ratingForClean: 4,
        ratingForFood: 5,
        notes: "Notes for restaurant 1"
    },
    {
        rOwnerRate: "John Doe",
        rName: "Restaurant 2",
        rType: "Bar",
        rAddress: "Demo",
        date_time: "10/10/2020 10:30 PM",
        avgCost: 300000,
        ratingForService: 2,
        ratingForClean: 4,
        ratingForFood: 5,
        notes: "Notes for restaurant 2"
    },
    {
        rOwnerRate: "John Doe",
        rName: "Restaurant 3",
        rType: "Bar",
        rAddress: "Demo",
        date_time: "10/10/2020 10:30 PM",
        avgCost: 300000,
        ratingForService: 2,
        ratingForClean: 4,
        ratingForFood: 5,
        notes: "Notes for restaurant 3"
    },
    {
        rOwnerRate: "John Doe",
        rName: "Restaurant 4",
        rType: "Bar",
        rAddress: "Demo",
        date_time: "10/10/2020 10:30 PM",
        avgCost: 300000,
        ratingForService: 2,
        ratingForClean: 4,
        ratingForFood: 5,
        notes: "Notes for restaurant 4"
    }
]

var rateResDB;
var request = window.indexedDB.open("Rate-Restaurant-DB", 1);
request.onupgradeneeded = function (event) {
    var rateResDB = event.target.result;
    var objectStore = rateResDB.createObjectStore("RRDB", { keyPath: "id", autoIncrement: true });
    for (var i in list_restaurants) {
        objectStore.add(list_restaurants[i])
    }
}

request.onsuccess = function (event) {
    rateResDB = request.result;
    console.log("Success: " + rateResDB);
}

function loadAllData(collectionName) {
    const transaction = rateResDB.transaction([collectionName], "readonly");
    const objectStore = transaction.objectStore(collectionName);
    request = objectStore.getAll();
    return request;
}

function addRate(collectionName, data) {
    const newRate = rateResDB.transaction([collectionName], "readwrite").objectStore(collectionName).add(data)
    newRate.onsuccess = () => {
        window.localStorage = "#feedback"
        $('#addRate').each(function () {
            this.reset()
        })
        navigator.notification.beep(1);
        navigator.vibrate(100)
        alert("Rated Successfully")
        $('#searchPage').empty()
        loadHome()
    }
    newRate.onerror = () => {
        alert('Error Rate')
    }
}
function detailsData(data) {
    const detailsRate = rateResDB.transaction(["RRDB"], "readonly").objectStore("RRDB").get(Number(data))
    detailsRate.onerror = function () {
        alert("Error getting")
    }
    return detailsRate
}

function deleteData(data) {
    const deleteRate = rateResDB.transaction(["RRDB"], "readwrite").objectStore("RRDB").delete(data)
    deleteRate.onerror = function () {
        alert("Error deleting")
    }
    return deleteRate
}
