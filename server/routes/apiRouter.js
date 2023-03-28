const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { User } = require('../db/models');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const pass = await bcrypt.hash(password, 7);
  const [currUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, email, password: pass },
  });
  if (!created) {
    return res.sendStatus(400);
  }
  req.session.user = {
    id: currUser.id,
    email: currUser.email,
    name: currUser.name,
  };
  return res.sendStatus(200);
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const currUser = await User.findOne({ where: { email } });
  const compare = await bcrypt.compare(password, currUser.password);
  if (compare) {
    req.session.user = {
      id: currUser.id,
      email: currUser.email,
      name: currUser.name,
    };
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.redirect('/');
});

router.get('/whisky', async (req, res) => {
  try {
    const whisky = await axios('https://catalog.wb.ru/catalog/electronic15/catalog?curr=rub&dest=-1257786&regions=80,64,38,4,115,83,33,68,70,69,30,86,75,40,1,66,48,110,22,31,71,114,111&sort=popular&spp=0&subject=2290', {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });
    console.log(whisky.data);
    res.json(whisky.data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
