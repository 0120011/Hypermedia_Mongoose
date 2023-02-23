var express = require('express');
const { body, validationResult } = require('express-validator');
const issueModel = require('../models/issueModel');

var router = express.Router();

async function renderIndex(res) {
  try {
    const issues = await issueModel.find();
    res.render('index', { issues: issues });
  } catch (error) {
    console.log(error);
  }
}

function renderForm(res, issue, errors = null) {
  res.render('issueForm', {
    issue: issue,
    errors: errors ? errors.array() : null
  });
}

/* GET home page. */
router.get('/', async (req, res) => {
  renderIndex(res);
});

router.route('/new')
  .get((req, res) => {
    res.render('issueForm');
  })
  .post(
      body('name', 'Gib einen Namen an').trim().notEmpty(),
      body('adresse').trim(),
      body('telefon').trim(),
      body('email', 'Gib eine gütlige Email an').trim().isEmail(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        renderForm(res, req.body, errors);
      } else {
        try {
          if (!req.body.newsletter) req.body.newsletter = null;
          req.body.newsletter = req.body.newsletter ? true : false;
          const issue = new issueModel(req.body);
          await issue.save();
          renderIndex(res);
        } catch (error) {
          console.log(error);
        }
      }
    }
  );

router.get('/delete/:id', async (req, res) => {
  try {
    await issueModel.deleteOne({ _id: req.params.id });
    renderIndex(res);
  } catch (error) {
    console.log(error);
  }
});

router.route('/edit/:id')
  .get(async (req, res) => {
    try {
      const issue = await issueModel.findById({ _id: req.params.id });
      renderForm(res, issue);
    } catch (error) {
      console.log(error);
    }
  })
  .post(
    body('name', 'Gib deinen Namen an').trim().notEmpty(),
      body('adresse').trim(),
      body('telefon').trim(),
      body('email', 'Gib eine Email an').trim().isEmail(),
      body('newsletter').trim(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        renderForm(res, req.body, errors);
      } else {
        try {
          if (!req.body.newsletter) req.body.newsletter = null;
          req.body.newsletter = req.body.newsletter ? true : false;
          await issueModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body
          );
          renderIndex(res);
        } catch (error) {
          console.log(error);
        }
      }
    }
  );

module.exports = router;
