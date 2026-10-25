let trash = document.getElementsByClassName("delete");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        //event id - 
        const eventId = element.dataset.eventId
        console.log(eventId, "front")
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