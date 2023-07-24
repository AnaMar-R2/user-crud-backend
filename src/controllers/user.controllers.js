const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
  const users = await User.findAll()
  return res.json(users)
});

const create = catchError(async (req,res) => {
  const user = req.body
  const createUser = await User.create(user)
  return res.status(201).json(createUser)
})

const getOne = catchError(async (req,res) => {
  const { id } = req.params
  const user = await User.findByPk(id)
  if (!user) return res.sendStatus(400)
  return res.json(user) // _> .length -- .map()
})

const destroy = catchError(async(req,res)=>{
  const {id} = req.params
  const userDestroy = await User.destroy({where:{id}}) 
  if(!userDestroy) return res.sendStatus(400)
  return res.sendStatus(204)
})

const update = catchError(async(req,res)=>{
  const {id} = req.params
  const user = await User.update(req.body,
    {where:{id},returning:true})
  if(user[0]===0) return res.sendStatus(400)
  return res.json(user[1][0])
  
})

module.exports = {
  getAll,
  create,
  getOne,
  destroy,
  update
}