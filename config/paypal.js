
module.exports = function payPalConfig(mode, client_id, client_secret){
    paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZuiUxz7WURmhQrBYg_unb76t5kzb3qIiOcP43aN0s93EayoeHVxoim_iWld-wrfy45OpMR1S9V_Ny_3',
    'client_secret': 'EEHmGOjNmpwK0164a4Nm4gVMYUoytEhUcTy7peNJiJFdeb-N0WBNSsD68LpX4zDfHvNKY7WLwgawKdhM'
    });
}