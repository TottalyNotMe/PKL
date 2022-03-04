$(document).ready(function () {

    let time, dayname, day
    let flag = 0
    let html = ""
    let arrAlarm = []
    function getTime() {
        time = moment().format('hh:mm:ss A')
        dayname = moment().format('dddd')
        day = moment().format('DD-MM-YYYY')
        $('#time').text(time)
        $('#text').text(time)
        $('#day').text(dayname + ", " + day)
    }

    getTime()
    //interval every minute
    setInterval(() => {
        showNotif(moment().format('hh:mm'))
        getTime()
    }, 1000); //satuan milisecond

    //delete item
    $(document).on('click', '#delList', function () {
        let id = $(this).data('in')
        console.log(id);
        //delete
        arrAlarm.splice(id, 1)
        $('listAlarm').empty()
        //update List
        displayList()
    })
    $('#btnAdd').on('click', () => {
        $('#listAlarm').empty()

        //get value//
        let dataNotes = $('#inputNotes').val()
        let dataTime = $('#inputTime').val()
        dataObj = {
            notes: dataNotes,
            time: dataTime
        }
        //push into arr
        arrAlarm.push(dataObj)
        //empty input
        $('#inputNotes').val('')
        $('#inputTime').val('')
        //close modal
        $('#exampleModal').modal('hide')
        //update alarm
        displayList()
    })

function displayList() {
            html = ""
            arrAlarm.forEach((el, index) => {
                html += `
    <div class="col-md-12 my-2">
          <div class="card w-100">
              <div class="card-body p-1 m-1">
                <div class="row">
         <div class="col-md-10 col-sm-8">
                 <span> ${el.notes}</span
                  </div>
            <div class="col-md-5 col-sm-2 d-flex justify-content-end">
                 <span>${el.time}</span>
    </div>
            <div class="col-md-2 col-sm-2 d-flex justify-content-end">
    <span class="text-danger-del-list" id="delList" data-index="${index}">x</span>
                    </div>
                </div>
          </div>
        </div>
    </div>
    `
            });
            $('#listAlarm').append(html)
        }
function showNotif(time) {
            arrAlarm.forEach(el => {
                if(time == el.time) {
                    if (flag !=1) { 
                let alert = `
                <div class="alert alert-light mt-2" role="alert">
                Alarm ${el.notes}, waktu menunjukkan pukul : ${el.time}
                </div>`

                $('#alert').append(alert)
            }
            flag = 1
        }
     });
}
})
