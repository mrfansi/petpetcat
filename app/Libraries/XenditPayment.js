"use strict";
const Xendit = require("xendit-node");

class XenditPayment {
    constructor(externalID, callbackURL = "", redirectURL = "") {
        this.externalID = externalID;
        this.callbackURL = callbackURL;
        this.redirectURL = redirectURL;
        this.x = new Xendit({
            secretKey: process.env.XENDIT_SECRET_KEY,
        });
    }

    // Balance Services

    // Query Parameter	Description
    // default: CASH	string The selected balance type
    // available values: CASH, HOLDING, TAX
    getBalance(accountType) {
        const { Balance } = this.x;
        const balanceSpecificOptions = {};
        const b = new Balance(balanceSpecificOptions);
        return b.getBalance({
            accountType: accountType,
        });
        // .then(({ balance }) => {
        //   console.log('Holding balance amount:', balance);
        //   return balance
        // });
    }

    // Invoice Services
    createInvoice(data) {
        const { Invoice } = this.x;
        const invoiceSpecificOptions = {};
        const i = new Invoice(invoiceSpecificOptions);

        return i.createInvoice({
                externalID: this.externalID,
                ...data,
            })
            .then((response) => {
                const { id } = response;
                console.log(`Invoice created with ID: ${id}`);
                return response;
            })
            .catch(e => {
                console.error(`Get invoice failed with message: ${e.message}`);
                return e.message;
            })
    }

    getInvoice(id) {
        const { Invoice } = this.x;
        const invoiceSpecificOptions = {};
        const i = new Invoice(invoiceSpecificOptions);

        const get_invoice = i.getInvoice({ invoiceID: id });
        return get_invoice;
        // .then((response) => {
        //   console.log("Successfully get invoice")

        //   console.log(response)
        //   return response;
        // })
        // .catch(e => {
        //   console.error(`Invoice creation failed with message: ${e.message}`);
        //   return e.message;
        // })
    }

    expireInvoice(id) {
        const { Invoice } = this.x;
        const invoiceSpecificOptions = {};
        const i = new Invoice(invoiceSpecificOptions);

        return i.expireInvoice({ invoiceID: id });
        // .then((response) => {
        //   console.log("Successfully get expire invoice")
        //   return response;
        // })
        // .catch(e => {
        //   console.error(`Get expire invoice failed with message: ${e.message}`);
        //   return e.message;
        // })
    }

    getAllInvoices(data) {
        const { Invoice } = this.x;
        const invoiceSpecificOptions = {};
        const i = new Invoice(invoiceSpecificOptions);
        return i.getAllInvoices(data);
        // .then((response) => {
        //   console.log("Successfully get invoices")
        //   return response;
        // })
        // .catch(e => {
        //   console.error(`Get invoices failed with message: ${e.message}`);
        //   return e.message;
        // })
    }

    // Disbursement Services
    getAvailableBanks() {
        const { Disbursement } = this.x;
        const disbursementSpecificOptions = {};
        const d = new Disbursement(disbursementSpecificOptions);
        return d.getBanks()
            .then((response) => {
                console.log("Successfully get available banks")
                return response;
            })
            .catch(e => {
                console.error(`Get available banks failed with message: ${e.message}`);
                return e.message;
            })
    }

    sendMoney(data) {
        const { Disbursement } = this.x;
        const disbursementSpecificOptions = {};
        const d = new Disbursement(disbursementSpecificOptions);

        return d.create(data)

        .then((response) => {
                const { id } = response;
                console.log(`Disbursement created with ID: ${id}`);
                return response;
            })
            .catch(e => {
                console.error(`Disbursement creation failed with message: ${e.message}`);
                return e.message;
            });
    }

    // EWallet Services
    createPaymentOvo(phoneField, amountField) {
        const { EWallet } = this.x;
        const ewalletSpecificOptions = {};
        const ew = new EWallet(ewalletSpecificOptions);

        return ew
            .createPayment({
                externalID: this.externalID,
                amount: amountField,
                phone: phoneField,
                ewalletType: EWallet.Type.OVO,
            })
            .then((response) => {
                console.log(`OVO Payment created with ID : ${response.id}`);
                return response;
            })
            .catch((e) => {
                console.error(`OVO Payment creation failed with message: ${e.message}`);
                return e;
            });
    }

    getPaymentOvo() {
        const { EWallet } = this.x;
        const ewalletSpecificOptions = {};
        const ew = new EWallet(ewalletSpecificOptions);

        return ew.getPayment({
            externalID: this.externalID,
            ewalletType: EWallet.Type.OVO,
        });
    }

    createPaymentDana(amountField) {
        const { EWallet } = this.x;
        const ewalletSpecificOptions = {};
        const ew = new EWallet(ewalletSpecificOptions);

        return ew
            .createPayment({
                externalID: this.externalID,
                amount: amountField,
                callbackURL: this.callbackURL,
                redirectURL: this.redirectURL,
                ewalletType: EWallet.Type.Dana,
            })
            .then((response) => {
                console.log(`DANA Payment created with ID : ${response.business_id}`);
                return response;
            })
            .catch((e) => {
                console.error(
                    `DANA Payment creation failed with message: ${e.message}`
                );
                return e;
            });
    }

    getPaymentDana() {
        const { EWallet } = this.x;
        const ewalletSpecificOptions = {};
        const ew = new EWallet(ewalletSpecificOptions);

        return ew.getPayment({
            externalID: this.externalID,
            ewalletType: EWallet.Type.Dana,
        });
    }

    createPaymentLinkAja(phoneField, amountField, items = []) {
        const { EWallet } = this.x;
        const ewalletSpecificOptions = {};
        const ew = new EWallet(ewalletSpecificOptions);

        return ew
            .createPayment({
                externalID: this.externalID,
                phone: phoneField,
                amount: amountField,
                items: items,
                callbackURL: this.callbackURL,
                redirectURL: this.redirectURL,
                ewalletType: EWallet.Type.LinkAja,
            })
            .then((response) => {
                console.log(`LINKAJA Payment created with ID : ${response.id}`);
                return response;
            })
            .catch((e) => {
                console.error(
                    `LINKAJA Payment creation failed with message: ${e.message}`
                );
                return e;
            });
    }

    getPaymentLinkAja() {
        const { EWallet } = this.x;
        const ewalletSpecificOptions = {};
        const ew = new EWallet(ewalletSpecificOptions);

        return ew.getPayment({
            externalID: this.externalID,
            ewalletType: EWallet.Type.LinkAja,
        });
    }

    // Virtual Account Services

    getVABanks() {
        const { VirtualAcc } = this.x;
        const vaSpecificOptions = {};
        const va = new VirtualAcc(vaSpecificOptions);

        return va.getBanks();
    }

    createFixedVA(data) {
        const { VirtualAcc } = this.x;
        const vaSpecificOptions = {};
        const va = new VirtualAcc(vaSpecificOptions);

        return va
            .createFixedVA({
                externalID: this.externalID,
                ...data,
            })
            .then((response) => {
                console.log(
                    `Xendit created FVA ${response.bank_code} (${response.name}) with id: ${response.id}`
                );
                return response;
            });
    }

    // QR Code Services
    create_QR(data) {
        const { QrCode } = this.x;
        const qrcodeSpecificOptions = {};
        const q = new QrCode(qrcodeSpecificOptions);
        return q
            .createCode({
                externalID: this.externalID,
                callbackURL: this.callbackURL,
                type: QrCode.Type.Dynamic,
                ...data,
            })
            .then((response) => {
                console.log(`QR code created with ID: ${response.id}`);
                return response;
            })
            .catch((e) => {
                console.error(`QR code creation failed with message: ${e.message}`);
                return e;
            });
    }

    new_create_QR(amount) {
        let dataString = `external_id=${this.externalID}&type=DYNAMIC&callback_url=${this.callbackURL}=${amount}`;
        let options = {
            url: "https://api.xendit.co/qr_codes",
            method: "POST",
            body: dataString,
            auth: {
                user: process.env.XENDIT_SECRET_KEY,
                pass: "",
            },
        };
        return options;
    }
    get_QR() {
        const { QrCode } = this.x;
        const qrcodeSpecificOptions = {};
        const q = new QrCode(qrcodeSpecificOptions);
        return q
            .getCode({
                externalID: this.externalID,
            })
            .then((response) => {
                console.log(`get QR code with ID: ${response.id}`);
                return response;
            })
            .catch((e) => {
                console.error(`get QR code failed with message: ${e.message}`);
                return e;
            });
    }
}

module.exports = XenditPayment;
