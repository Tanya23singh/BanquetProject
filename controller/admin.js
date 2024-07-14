const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const booked = require("../model/booked");
const User = require("../model/user");
const Comment = require("../model/comment");

AdminBro.registerAdapter(AdminBroMongoose);

const express = require("express");
const app = express();

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
  branding: {
    companyName: "PartyVenue",
    logo: "/images/logo.png",
    softwareBrothers: false,
  },
  resources: [
   
    {
      resource: User,
      options: {
        parent: {
          name: "User Content",
          icon: "User",
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          username: {
            isTitle: true,
          },
        },
      },
    },
    {
      resource: Comment,
      options: {
        parent: {
          name: "Comment",
          icon: "Comment",
        },
        properties: {
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          username: {
            isTitle: true,
          },
          comment: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          }
        },
      },
    },
    {
      resource: booked,
      
        properties: {
         
          _id: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          banquet: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          amount: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          createdAt: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          email: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          
          
        },
      },
    
   
    
  ],
  locale: {
    translations: {
      labels: {
        loginWelcome: "Admin Panel Login",
      },
      messages: {
        loginWelcome:
          "Please enter your credentials to log in and manage your website contents",
      },
    },
  },
 
});

const ADMIN = {
  email: 'arpanrajput785@gmail.com',
  password: 'arpan@123',
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: process.env.ADMIN_COOKIE_NAME||'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD||'super-secret'
});
module.exports = router;


