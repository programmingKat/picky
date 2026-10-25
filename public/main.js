let trash = document.getElementsByClassName("delete");
let edit  = document.getElementsByClassName("update");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        //event id - 
        const eventId = element.dataset.eventId
        fetch('events', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            eventId
          })
        }).then(function (response) {
            console.log(response)
          //use DOM .removeChild() instead of a window reload
          window.location.reload()
        })
       });
});


Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        //event id - 
        const eventId = element.dataset.eventId
        console.log(eventId, "front")
        window.location.href = `/event/${eventId}/edit`
        // fetch(`/event/${eventId}/edit`, {
        //   method: 'get',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        // }).then(function (response) {
            //console.log(response)
          //use DOM .removeChild() instead of a window reload
        //   window.location.reload()
       // })
       });
});