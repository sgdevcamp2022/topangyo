const router = require('express').Router();
const verifyJwtToken = require("../middlewares/verifyJwtToken");

const HandleCreateContent = require('../controllers/createContentController');
const HandleDeleteContent = require('../controllers/deleteContentController');
const HandleGetAllContents = require('../controllers/getAllContentsController');
const HandleGetSingleContent = require('../controllers/getSingleContentController');
const HandleUpdateContent = require('../controllers/updateContentController');
const HandleGetContentByCategory = require('../controllers/getContentByCategory');
const HandleGetJustAllContents = require('../controllers/getJustAllContentsController');
const HandleGetContentByKeyword = require('../controllers/getContentByKeyword');
// Retrieve all Contents
router.get('/post/:list', HandleGetAllContents.getAllContents);
router.get('/post/all/list', HandleGetJustAllContents.getJustAllContents);

// Retrieve Content by id
router.get('/post/get/:id', HandleGetSingleContent.getSingleContent);

// // Retrieve Content by id
router.get('/post/content/:list', HandleGetContentByCategory.getCategoryContents);

// // Retrieve Keyword by id
router.get('/post/keyword/:list', HandleGetContentByKeyword.getKeywordContents);

//verifyJwtToken
//create Content
router
  .route('/post/create')
  .post(verifyJwtToken, HandleCreateContent.createContent)

//update Content by id
router
  .route('/post/update/:id')
  .put(verifyJwtToken, HandleUpdateContent.updateContent) 

//delete Content by id
router
  .route('/post/delete/:id')
  .delete(verifyJwtToken, HandleDeleteContent.deleteContent)

module.exports = router;