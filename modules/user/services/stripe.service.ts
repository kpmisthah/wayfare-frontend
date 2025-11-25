import Stripe from "stripe"
import { NextApiRequest,NextApiResponse } from "next"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,{
    apiVersion:"2025-08-27.basil"
})
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method == "POST"){
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:[
                {
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:"Travel package booking"
                        },
                        unit_amount:1000
                    },
                    quantity:1
                }
            ],
            mode:"payment",
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/cancel`,            
        })
        res.status(200).json({id:session.id})
    }else{
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");   
    }
}