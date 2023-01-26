import https from 'https';

import { Product } from '../../models/product.js';
import { User } from '../../models/user.js';
import { Seller } from '../../models/seller.js';
import { AuthController } from '../auth/AuthController.js';

export async function sellersProd(req, res) {
    let data = '';
    const request = https.get({
        path: `/products`,
        hostname: "ebay-api-get.herokuapp.com",
        method: 'GET'
    }, ress => {
        ress.on('data', chunk => { data += chunk })
        ress.on('end', () => {
            console.log('data');
            const result = JSON.parse(data);
            result.sellers.map(x => {
            	const reqq = {}
                reqq.body = x
                try {
                    let ress = {
                        status: (status) => { return { json: (mess) => { console.log(mess) } } },
                    }
                    AuthController.sellerSignup(reqq, ress);
                } catch (err) {
                    console.log('errr')
                    console.log(Object.keys(err))
                }

            })

            res.json(result);

        })
    })
}