const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkId = (req, res, next, val) => {
    const tour = tours.find(el => el.id === +req.params.id)
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            messagae: 'Invalid ID'
        })
    }
    next()
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            messagae: 'Missing name or price'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.getTour = (req, res) => {
    const tour = tours.find(el => el.id === +req.params.id)
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

exports.updateTour = (req, res) => {
    const tour = tours.find(el => el.id === +req.params.id)
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

exports.deleteTour = (req, res) => {
    const tour = tours.find(el => el.id === +req.params.id)
    res.status(204).json({
        status: 'success',
        data: null
    })
}

