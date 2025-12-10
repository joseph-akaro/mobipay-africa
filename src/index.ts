import { MtnProvider } from "./providers/MTNProvider"
import { MpesaProvider } from "./providers/MpesaProvider"
import { AirtelProvider } from "./providers/AirtelProvider"
import { ZainProvider } from "./providers/ZainProvider"

export const Provider = {
    "mtn" : MtnProvider,
    "mpesa" : MpesaProvider,
    "Airtel" : AirtelProvider,
    "zain" : ZainProvider
}