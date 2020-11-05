function loadHome() {
    const resType = loadAllData("RRDB")
    resType.onsuccess = (event) => {
        const results = event.target.result
        for (var i in results.reverse()) {
            let html = `
            <li>
                <div>
                    <a>
                    <h3>${results[i].rName}</h3>
                    <p>${results[i].avgCost}</p>
                    <p>${results[i].rType}</p>
                    <p>${results[i].rAddress}</p>
                    </a>
                    <p>AVG Rating: <span>${parseFloat((Number(results[i].ratingForClean) + Number(results[i].ratingForFood) + Number(results[i].ratingForService)) / 3).toFixed(1)}</span><span class="fa fa-star"></span></p>
                </div>
                <button class="btn" rateId="${results[i].id}" id="delete_rate"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                <button class="btn" rateId="${results[i].id}" href="#detailPage" id="detail_rate"><i class="fa fa-eye" aria-hidden="true"></i></button>

            </li>
            `
            $('#listResRate').append(html);
            $('#searchPage').append(html);
           
        }
    }
}

$(window).on("load", function () {
    loadHome()
  });
$(document).ready(function () {
    $('#index').on('click', () => {
        $('#listResRate').empty()
        loadHome()
    });
    $(document).on('click', '#delete_rate', function () {
        const rateid = $(this).attr("rateId")
        const result = deleteData(Number(rateid))
        result.onsuccess = function () {
            $('#listResRate').empty()
            navigator.notification.beep(1);
            navigator.vibrate(100)
            loadHome()
        }
    });
    $('#search').on('click', function () {
        $('#searchPage').empty();
        loadHome()
    })
    $(document).on('click', '#detail_rate', function(){
        const rateId = $(this).attr("rateId")
        const result = detailsData(rateId)
        result.onsuccess = function (event) {
            $(location).attr('href', "#detailPage")
            const restDetails = event.target.result
            let html =`
            <h1>Restaurant Details</h1>
            <div>
                <h3>${restDetails.rName}</h3>
                <p>${restDetails.rType}</p>
                <p>AVG Cost: ${restDetails.avgCost}</p>
                <p>Address: ${restDetails.rAddress}</p>
                <p>Rating for service: ${restDetails.ratingForService} </span><span class="fa fa-star"></span></p>
                <p>Rating for clean: ${restDetails.ratingForClean} </span><span class="fa fa-star"></span></p>
                <p>Rating for food: ${restDetails.ratingForFood} </span><span class="fa fa-star"></span></p>
                <p>AVG Rating: <span>${parseFloat((Number(restDetails.ratingForClean) + Number(restDetails.ratingForFood) + Number(restDetails.ratingForService)) / 3).toFixed(1)}</span><span class="fa fa-star"></span></p>
                <p>Date & Time of visit: ${restDetails.date_time}</p>
                <p>Notes: ${restDetails.notes}</p>
                <p>Name of the reporter: ${restDetails.rOwnerRate}</p>
            </div>
             `
             $('#detail1').empty().append(html)
       }
   })
   $(document).on('submit', '#addRate', function (){
       const data = {
        rOwnerRate: $('#rOwnerRate').val(),
        rName: $('#rName').val(),
        rType: $('#rType').val(),
        date_time: $('#date_time').val(),
        avgCost: $('#avgCost').val(),
        ratingForService: $('#ratingForService').val(),
        ratingForClean: $('#ratingForClean').val(),
        ratingForFood: $('#ratingForFood').val(),
        // notes: $('#notes').val(),
       }
       addRate('RRDB', data)
       return false
   })
})