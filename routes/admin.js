const router = require('express').Router()
const admin  = require('../models/Admin')
const argon2 = require('argon2')

router.get('/',async(req,res)=>{
  res.json('oke')
})

router.get('/all',async(req,res)=>{
  const result = await admin.findAll({})
  if(!result) res.json('Server erorr')
  res.json({msg:result})
})


router.post('/add',async(req,res)=>{
  const {email,password} = req.body
  const hash = await argon2.hash(password)
  const result = await admin.create({
    email:email,
    password:hash
  })
  if(!result) res.json({msg:'Server error'})
  res.json({msg:'Data berhasil dibuat'})
})

router.delete('/delete/:id',async(req,res)=>{
  const id = req.params.id
  const result = await admin.destroy({where:{id:id}})
  if(!result) res.json('Gagal hapus data')
  res.json('Berhasil hapus data')
})


module.exports = router
