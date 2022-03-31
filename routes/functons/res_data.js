const resData = async (req, res) => {
    const items = req.body;
    let qrcodeTitleNotVild = false;
    let qrcodeDataNotVild = false;
    if (items[0]) {

        items.map((item, index) => {
            const qrcodeTitle = item.qrcodeTitle.toString().trim();
            const qrcodeData = item.qrcodeData.toString().trim();
            if (qrcodeTitle) {
                if (qrcodeTitle.length > 12) {
                    qrcodeTitleNotVild = true;
                }
            }

            if (qrcodeData.length > 7000 || !qrcodeData) {
                qrcodeDataNotVild = true;
            }
        })

        if (qrcodeTitleNotVild || qrcodeDataNotVild) {
            res.status(400).json({
                status: 'not vild',
                message: 'Qrcode title(Option) range 0-12  characters or qrcode value range 1-7000 characters or value not found!'
            })
        } else {
            res.status(201).json(items)
        }

    } else {
        res.status(400).json({
            message: 'Request not found'
        });
    }
}

module.exports = {
    resData
}