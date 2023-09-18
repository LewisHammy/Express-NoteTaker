const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(Json.parse(data)));
    console.log(data);
});

router.post('/', (req, res => {
    console.info('${req.method} request received to submit notes');
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const respone = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error');
    }
}));

router.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    let selectData;
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            selectedData = JSON.parse(data);
            const filterData = selectedData.filter((note) => note.id !== id);
            writeNewFile('./db/db.json', filterData);
        }

    });
    res.send('The following were deleted, Note- ${req.params.id}');
});

module.exports = router;

