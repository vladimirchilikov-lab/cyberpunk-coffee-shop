import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { cart } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cart.map((p) => ({
      price_data: {
        currency: "eur",
        product_data: { name: p.name },
        unit_amount: Math.round(p.price * 100)
      },
      quantity: 1
    })),
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000/cart"
  });

  return Response.json({ url: session.url });
}
