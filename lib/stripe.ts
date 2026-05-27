import Stripe from 'stripe'

let _stripe: Stripe | null = null

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop: string | symbol) {
    if (!_stripe) {
      _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-06-20',
      })
    }
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop]
  },
})
