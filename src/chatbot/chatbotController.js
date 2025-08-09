const chatbotService = require('../chatbot/chatbotService')
const responseWrapper=require('../helper/wrapper')


class UserController{
    static async chat (req,res){
        try {
            const {userInput}= req.body

            if(!userInput){
                return responseWrapper(res,400,'Mohon Masukan User Input')
            }

            const botResult= await chatbotService.sendChatBot(userInput)

            return responseWrapper(res,200,'Chat Berhasil Dibuat oleh gemini',{botResult})
        } catch (error) {
          return responseWrapper(res,500,'Internal Server error')  
        }
    }

   

    static async getChatById(req,res){
        try {
            const {id}= req.params
            const getChat = await chatbotService.getChatById(id)

            return responseWrapper(res,201,"Successfully Chat By Id",getChat)
        } catch (error) {
             return responseWrapper(res, error.statusCode, error.message, {});
        }
    }

    static async getAllChat(req,res){
        try {
        const getAllChats= await chatbotService.getAllChat()
        return responseWrapper(res,201,"Successfully Get All Chat",getAllChats)
        } catch (error) {
        return responseWrapper(res, error.statusCode, error.message, {});  
        }
    }

    static async updateBotChat(req,res){
        try {
            const { id } = req.params;
            const { newPrompt } = req.body; 
    
            if (!newPrompt) {
                return res.status(400).json({ message: "Prompt tidak boleh kosong" });
            }
    
            const updatedChat = await chatbotService.updateChatbot(id, newPrompt);
            
        if (!updatedChat || !updatedChat.botReply) {
            return res.status(500).json({ message: "Gagal memperbarui chat" });
        }

        return responseWrapper(res, 200, "Successfully updated chat", {
            userInput: newPrompt,
            botReply: updatedChat.botReply
        });

        } catch (error) {
            return responseWrapper(res, error.statusCode, error.message, {});  
        }
    }

      static async deleteChat(req,res){
        try {
            const {id}= req.params
            const deleteChat= await chatbotService.deleteChatById(id)
            return responseWrapper(res, 201, "Successfully Delete Chat",{});
        } catch (error) {
            return responseWrapper(res, error.statusCode, error.message, {});
        }
    }
}

module.exports= UserController