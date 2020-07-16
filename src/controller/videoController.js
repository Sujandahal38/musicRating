/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const Joi = require('@hapi/joi');
const ytThumnail = require('youtube-thumbnail');
const puppeteer = require('puppeteer');

const Video = require('../model/Video');

exports.AddVideo = async (req, res, next) => {
  try {
    const validationSchema = Joi.object({
      title: Joi.string().trim().max(100).required(),
      description: Joi.string().trim().max(500),
      youtubeLink: Joi.string()
        .trim()
        .required()
        .regex(
          /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
        ),
      genre: Joi.string().trim().max(75),
      artist: Joi.string().trim().max(70),
    });
    const validate = await validationSchema.validateAsync(req.body);
    if (validate) {
      const {
        title,
        description,
        youtubeLink,
        artist,
        genre,
      } = req.body;
      const createdBy = req.adminInfo.id;
      const checkVideo = await Video.findOne({
        youtubeLink,
      });
      if (!checkVideo) {
        const grabEmbedCode = String(youtubeLink).match(
          /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/,
        );
        const embedCode = grabEmbedCode[2];
        const thumbnail = ytThumnail(youtubeLink);
        const videoInfo = new Video({
          title,
          description,
          youtubeLink,
          genre,
          artist,
          embedCode,
          createdBy,
          thumbnail: thumbnail.high.url,
        });
        const saveVideoData = await videoInfo.save();
        if (saveVideoData) {
          res.status(200).json({
            message: 'video added successfully 🎉',
          });
        }
      }
      if (checkVideo) {
        res.status(400).json({
          message: 'Video already exists 🤷‍',
        });
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
};

// helperFunction
function getElText(page, selector) {
  // eslint-disable-next-line no-shadow
  return page.evaluate(
    () => document.querySelector(selector).innerText,
    selector,
  );
}

exports.youtubeScrape = async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    const findVideo = await Video.findOne({
      _id: id,
    });
    if (findVideo) {
      const {
        youtubeLink,
      } = findVideo;
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();
      await page.setViewport({
        width: 1366,
        height: 768,
      });
      const navigationPromise = page.waitForNavigation();
      await page.goto(youtubeLink, {
        waitUntil: 'load',
        timeout: 0,
      });
      await navigationPromise;
      await page.waitFor(2000); // time to load page

      await page.evaluate(() => {
        window.scrollBy(0, 300);
      });
      await page.waitForSelector('#content');
      await page.waitForSelector('#comments');

      await page.waitFor(2000);

      const totalCommentSelector = '.style-scope:nth-child(1) > #title > #count > .count-text';
      await getElText(page, totalCommentSelector);
      // eslint-disable-next-line radix
      // const total = Number(totalComments.replace(' Comments', '').replace(',', ''));
      const comments = [];
      for (let i = 1; i < 201; i += 1) {
        try {
          const commentSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #expander #content-text`;
          await page.waitForSelector(commentSelector);
          const fetchedComments = await getElText(page, commentSelector);
          // eslint-disable-next-line no-unused-vars
          await page.evaluate((_) => {
            window.scrollBy(0, 300);
          });
          comments.push(fetchedComments);
        } catch (error) {
          // eslint-disable-next-line no-continue
          continue;
        }
      }
      if (comments) {
        const commentSave = await Video.updateOne({
          _id: id,
        }, {
          $set: {
            youtubeComments: comments,
            updatedBy: req.adminInfo.id,
            updatedAt: Date.now(),
          },
        });
        if (commentSave) {
          res.status(200).json({
            message: 'comments saved successfully',
          });
          await browser.close();
        }
      }
    }
    if (!findVideo) {
      res.status(404).json({
        message: 'video not found.',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteVideo = async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    const findVideo = await Video.findOne({
      _id: id,
    });
    if (findVideo) {
      const deleteVideo = await Video.findOneAndDelete({
        _id: id,
      });
      if (deleteVideo) {
        res.status(200).json({
          message: 'Video deleted successfully.',
        });
      }
    }
    if (!findVideo) {
      res.status(400).json({
        message: 'Video do not exists',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.editVideo = async (req, res, next) => {
  try {
    const validationSchema = Joi.object({
      title: Joi.string().trim().max(100).required(),
      description: Joi.string().trim().max(500),
      youtubeLink: Joi.string()
        .trim()
        .required()
        .regex(
          /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?‌​=]*)?/,
        ),
      genre: Joi.string().trim().max(75),
      artist: Joi.string().trim().max(70),
    });
    const validate = await validationSchema.validateAsync(req.body);
    if (validate) {
      const {
        title,
        description,
        youtubeLink,
        artist,
        genre,
      } = req.body;
      const updatedBy = req.adminInfo.id;
      const {
        id,
      } = req.params;
      const checkVideo = await Video.findOne({
        _id: id,
      });
      if (checkVideo) {
        const grabEmbedCode = String(youtubeLink).match(
          /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/,
        );
        const embedCode = grabEmbedCode[2];
        const thumbnail = ytThumnail(youtubeLink);
        const editvideoInfo = await Video.updateOne({
          _id: id,
        }, {
          $set: {
            title,
            description,
            youtubeLink,
            genre,
            artist,
            embedCode,
            updatedBy,
            thumbnail: thumbnail.high.url,
          },
        });
        if (editvideoInfo.nModified > 0) {
          res.status(200).json({
            message: 'videoInfo updated successfully 🎉',
          });
        }
        if (editvideoInfo.nModified === 0) {
          res.status(305).json({
            message: 'not modified',
          });
        }
      }
      if (!checkVideo) {
        res.status(400).json({
          message: 'Video do not exists 🤷‍',
        });
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
};

exports.fetchVideo = async (req, res, next) => {
  try {
    const {
      limit,
    } = req.params;

    const fetchVideo = await Video.find()
      .sort({
        _id: -1,
      })
      .limit(parseInt(limit));
    if (fetchVideo) {
      res.status(200).json({
        message: 'fetched successfully 🎉',
        videoData: fetchVideo,
      });
    }
    if (!fetchVideo) {
      res.status(404).json({
        message: 'No video available ❌',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.VideoById = async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    const fetchVideo = await Video.findOne({
      _id: id,
    });
    if (!fetchVideo) {
      res.status(404).json({
        message: 'Video not Found 😢',
      });
    }
    if (fetchVideo) {
      res.status(200).json({
        message: 'video fetched 🎉',
        videoData: fetchVideo,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.searchVideo = async (req, res, next) => {
  try {
    const {
      text,
    } = req.params;
    const searchData = await Video.find({
      $or: [{
        title: {
          $regex: text,
          $options: 'i',
        },
      },
      {
        artist: {
          $regex: text,
          $options: 'i',
        },
      },
      {
        description: {
          $regex: text,
          $options: 'i',
        },
      },
      ],
    }).limit(5);
    if (!searchData) {
      res.status(404).json({
        message: 'No result found.',
      });
    }
    if (searchData) {
      res.status(200).json({
        message: 'searched result found.',
        data: searchData,
      });
    }
  } catch (error) {
    next(error);
  }
};
