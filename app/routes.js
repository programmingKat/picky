module.exports = function (app, db, ObjectId) {


    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/events/create', function (req, res) {
        res.render('create-event.ejs');
    });

    app.get('/events/:eventId/guest', async function (req, res) {
        res.render('guest.ejs', { eventId: req.params.eventId });
    });

    app.post('/events/create', async (req, res) => {
        const result = await db.collection('events').insertOne({
            name: req.body.eventName,
            date: req.body.eventDate,
            time: req.body.eventTime,
            type: req.body.eventType,
        },)
        console.log('saved to database')
        console.log(result)
        res.redirect(`/events/${result.insertedId}`,)
    })


    app.post('/events/guest', async (req, res) => {
        const result = await db.collection('guests').insertOne({
            eventId: req.body.eventId,
            name: req.body.guestName,
            dairyFree: req.body.dairyFree,
            glutenFree: req.body.glutenFree,
            vegeterian: req.body.vegeterian,
            vegan: req.body.vegan,
            pescatarian: req.body.pescatarian,
            halal: req.body.halal,
            kosher: req.body.kosher,
            rsvp: req.body.rsvp
        },)
        console.log('saved to database')
        console.log(result)
        res.redirect('/events',)
    })



    app.get('/events', async function (req, res) {
        let events = await db.collection('events').find().toArray()
        console.log(events)
        res.render('events.ejs', {events})
    });


    //app.get('/profile', isLoggedIn, function (req, res) {

        //     db.collection('messages').find().toArray((err, result) => {
        //       if (err) return console.log(err)
        //       res.render('profile.ejs', {
        //         user: req.user,
        //         messages: result
        //       })
        //     })
        //   }); 
        //Michael said I have to put this last 
        app.get('/events/:eventId', async function (req, res) {
            let event = await db.collection('events').findOne({ _id: new ObjectId(req.params.eventId) })
            console.log(event)
            res.render('event.ejs', { event: event });

        });



        // app.get('/users/:userId/books/:bookId', (req, res) => {
        //   res.send(req.params);
        // });

        // PROFILE SECTION =========================
        // app.get('/profile', isLoggedIn, function (req, res) {

        //     db.collection('messages').find().toArray((err, result) => {
        //         if (err) return console.log(err)
        //         res.render('profile.ejs', {
        //             user: req.user,
        //             messages: result
        //         })
        //     })
        // });
        // message board routes ===============================================================

        // app.post('/messages', (req, res) => {
        //     db.collection('messages').save({
        //         name: req.body.name,
        //         msg: req.body.msg,
        //         thumbUp: 0,
        //         thumbDown: 0
        //     }, (err, result) => {
        //         if (err) return console.log(err)
        //         console.log('saved to database')
        //         res.redirect('/profile')
        //     })
        // })

        // app.put('/thumbUp', (req, res) => {
        //     console.log(req.body, "body")
        //     console.log(req.body.id, "req.body.id")
        //     db.collection('messages')
        //         .findOneAndUpdate({
        //             _id: new ObjectID(req.body.id)
        //         }, {
        //             $inc: {
        //                 thumbUp: 1,
        //             }
        //         }, {
        //             sort: { _id: -1 },
        //             upsert: true
        //         }, (err, result) => {
        //             if (err) return res.send(err)
        //             res.send(result)
        //         })
        // })

        // app.put('/thumbDown', (req, res) => {
        //     db.collection('messages')
        //         .findOneAndUpdate({
        //             _id: new ObjectID(req.body.id)
        //         }, {
        //             $inc: {
        //                 thumbUp: -1
        //             }
        //         }, {
        //             sort: { _id: -1 },
        //             upsert: true
        //         }, (err, result) => {
        //             if (err) return res.send(err)
        //             res.send(result)
        //         })
        // })

        app.delete('/events',  async (req, res) => {
            console.log("inside delete")
             await db.collection('events').deleteOne({
                _id: new ObjectId(req.body.eventId)
            })
            res.send('succesful')
        })
    }