const sendMail = (req, res) => {
    const product = req.params.prod;
    const opening = req.params.opening;
    const type = req.params.type;
    const color = req.params.color

    const { width, height, quantity } = req.body

    const finalProduct = { product, opening, type, color, width, height, quantity }
    res.json(finalProduct);
}

export default { sendMail };