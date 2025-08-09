const router= require('express').Router()

const chatBotController=require("../chatbot/chatbotController")

router.post("/send-message",chatBotController.chat)
router.delete("/delete/:id",chatBotController.deleteChat)
router.get("/get-chats",chatBotController.getAllChat)
router.get("/get-chat/:id",chatBotController.getChatById)
router.put("/update-chat/:id",chatBotController.updateBotChat)

module.exports=router