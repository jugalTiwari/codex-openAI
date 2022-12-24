import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
dotenv.config()

console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send('Codex Running...');
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.data;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000, // more: more big response
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {

    }
})

app.listen(4000, () => {
    console.log('Server started at port:', 4000);
})