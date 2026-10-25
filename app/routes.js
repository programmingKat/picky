module.exports = function (app, db, ObjectId) {


    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/events/create', function (req, res) {
        res.render('create-event.ejs');
    });

    app.get('/events/:eventId/guest', function (req, res) {
        res.render('guest.ejs');
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

    //Michael said I have to put this last 
    app.get('/events/:eventId', async function (req, res) {
        let event = await db.collection('events').findOne({ _id: new ObjectId(req.params.eventId) })
        console.log(event)
        res.render('event.ejs', {event: event});
    
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

    // app.delete('/messages', (req, res) => {
    //     console.log(req.body.id)
    //     db.collection('messages').findOneAndDelete({
    //         _id: new ObjectID(req.body.id)
    //         // name: req.body.name, 
    //         // msg: req.body.msg 
    //     }, (err, result) => {
    //         if (err) return res.send(500, err)
    //         res.send('Message deleted!')
    //     })
    // })
}