import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import Stripe from "stripe"
import path from "path"
import helmet from "helmet" // Field protection
import {fileURLToPath} from "url"

dotenv.config()

// Check the availability STRIPE_PRIVATE_KEY
if (!process.env.STRIPE_PRIVATE_KEY) {
    console.error("❌ ERROR: STRIPE_PRIVATE_KEY is missing in .env")
    process.exit(1)
}

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: "2023-10-16",
})

const app = express()
app.use(cors({origin: "http://localhost:3000"})) // We allow access to the client
app.use(express.json()) // We allow json checks

// ✅ Add Helmet CSP for safety
app.use(cors({origin: "http://localhost:3000"})) // We allow the client's APIs from the client
app.use(express.json()) // JSON support in requests
app.use(express.urlencoded({extended: true})) // Support for URL-coded data

app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'", "http://localhost:3000"],
                scriptSrc: [
                    "'self'",
                    "'unsafe-inline'", //Allies inline scripts
                    "'unsafe-eval'", // Allows Eval () (for some frameworks)
                    "http://localhost:3000",
                    "http://localhost:3000/adobe",
                    "http://localhost:3000/trackonomics"
                ],
                scriptSrcElem: [
                    "'self'",
                    "'unsafe-inline'",
                    "'unsafe-eval'",
                    "http://localhost:3000",
                    "http://localhost:3000/adobe",
                    "http://localhost:3000/trackonomics"
                ],
                scriptSrcAttr: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:"],
                connectSrc: ["'self'", "http://localhost:3000", "https://api.stripe.com"],
                frameSrc: ["'self'", "https://js.stripe.com"],
                workerSrc: ["'self'", "blob:"], // Allows Web Workers
            },
        },
        crossOriginEmbedderPolicy: false, // Disconnect a strict COOP for iframe
    })
)

// Logging of response headlines (for debugging CSP)
app.use((req, res, next) => {
    res.on("finish", () => {
        console.log("🔍 Headers sent to client:", res.getHeaders())
    })
    next()
})

console.log("✅ Helmet CSP Middleware is applied")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 📌 Static files for production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "dist", "index.html"))
    })
}

// 📌 Тестовый маршрут API
app.get("/", (req, res) => {
    res.send("Welcome to E42 Shop website.")
})

// 📌 Функция расчета суммы заказа
const calculateOrderAmount = (items) => {
    return items.reduce((total, item) => total + item.price * item.cartQuantity, 0) * 100
}

// 📌 Создание PaymentIntent для Stripe
app.post("/create-payment-intent", async (req, res) => {
    try {
        const {items, shipping, description} = req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            description,
            shipping: {
                address: {
                    line1: shipping.line1,
                    line2: shipping.line2,
                    city: shipping.city,
                    country: shipping.country,
                    postal_code: shipping.postal_code,
                },
                name: shipping.name,
                phone: shipping.phone,
            },
        })

        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        console.error("❌ Error creating payment intent:", error)
        res.status(500).send({error: "Internal Server Error"})
    }
})

const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))