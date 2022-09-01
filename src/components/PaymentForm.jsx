

const PaymentButton = () => {

    const deviceId = '9fa747a2-25ff-48ee-b078-04381f7c828f'
    //const deviceIdString = deviceId.toString()
    //const deviceIdJson = JSON.stringify(deviceId, replacer);
    const ideKey = 'ec80b81a-8877-4d51-bc6f-02ab7b8cd183'
    //const ideKeyString = ideKey.toString()
    //const ideKeyJson = JSON.stringify(ideKey, replacer);

    const params = {
        idempotencyKey: ideKey,
        checkout: {
            amountMoney: {
            amount: 100,
            currency: 'JPY'
            },
            deviceOptions: {
            deviceId: deviceId
            }
        }
    }

    //console.log(typeof(params), params)


    async function createCheckout() {
        const res = await fetch('/api/squareapi',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(params) 
        });
        if (res.status === 200){
            var json = await res.json()
            console.log(json)
            alert("Success")
        } else {
            alert("error")
        }
    }

    return (
        <div>
            <button onClick={createCheckout}>checkout</button><br />
        </div>
    ) 
}

export default PaymentButton;