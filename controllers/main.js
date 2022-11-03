const express = require('express')
const path =  require('path');
const process = require('process');


module.exports={
    getMain: (req, res) =>{
        res.render('main',{
             title: "Main",
        });
    },
    getPersonal: (req, res) =>{
        res.render('main',{
             title: "personal",
        });
    },
    getWork: (req, res) =>{
        res.render('main',{
             title: "work",
        });
    },
    getCollege: (req, res) =>{
        res.render('main',{
             title: "college",
        });
    }
};