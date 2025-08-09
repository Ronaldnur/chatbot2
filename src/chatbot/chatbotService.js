const prisma= require("../../prisma/prismaClient")
const {GoogleGenerativeAI}=require("@google/generative-ai")
const {ApiError}=require("../helper/error")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function sendChatBot(userInput) {
   try {
     const sendChat= await prisma.chat.create({
        data:{userInput,botReply: null}
    })

    const prompt = `kamu adalah sistem yang sangat mengetahui apa itu Google Developers Groups On Campus'${userInput}'`;

    const model = genAI.getGenerativeModel({
        model:'gemini-2.5-flash'
    })
    const result = await model.generateContent(prompt)

    const response= result.response

    const botReply=response.text()

    await prisma.chat.update({
        where:{id:sendChat.id},
        data:{botReply}
    })   

    return botReply
   } catch (error) {
    console.error("Chatbot API Error:", error.message);
    throw new ApiError(error.statusCode || 400, error.message)
   }
}

async function getChatById(chatId) {
    try {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
        });
    
        if (!chat) {
            throw new ApiError(404, "Chat not found");
        }

        return chat
    } catch (error) {
        console.error("failed to get chat ByID", error.response?.data || error.message);
        throw new ApiError(error.statusCode || 400, error.message); 
    }
}

async function getAllChat() {
try {
    const chats = await prisma.chat.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })
    return chats
    
} catch (error) {
    console.error("Failed To Get All Chat", error.response?.data || error.message);
    throw new ApiError(error.statusCode || 400, error.message); 
}
}

async function updateChatbot(chatId, newPrompt) {
    try {

        const chatRecord = await prisma.chat.findUnique({ where: { id: chatId } });
        if (!chatRecord) throw new ApiError(404, "Chat tidak ditemukan");

       
        const prompt = [
            { role: "user", parts: [{ text: newPrompt }] }
        ];

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent({ contents: prompt });


        const responseText = await result.response.text(); // Memanggil text sebagai fungsi


        if (!responseText) {
            console.log("Gemini API Full Response:", JSON.stringify(result, null, 2));
            throw new Error("Gagal mendapatkan teks dari Gemini API");
        }


        const updatedChat = await prisma.chat.update({
            where: { id: chatId },
            data: { botReply: responseText }
        });

        return updatedChat;

    } catch (error) {
        console.error("Update Chatbot Error:", error?.response?.data || error?.message);
        throw new ApiError(error?.statusCode || 500, error?.message);
    }
}


async function deleteChatById(chatId) {
try {

    const chat = await prisma.chat.findUnique({
        where: { id: chatId },
    });

    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }
    
    const deleteChat= await prisma.chat.delete({
        where: { id: chatId },
    })

    return deleteChat
} catch (error) {
    console.error("failed delete chat", error.response?.data || error.message);
    throw new ApiError(error.statusCode || 400, error.message); 
}
    
}

module.exports={
    sendChatBot,
    deleteChatById,
    getChatById,
    getAllChat,
    updateChatbot
}


