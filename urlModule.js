const Users = require('./urlModel');

// program to generate random strings
function generateUrl() {
    let result = ' ';
    // declare all characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


const urlModule = {
    createUrl: async (req, res) => {
        try {
            const { urlLink } = req.body;

            if (!urlLink)
                return res.status(400).json({ msg: "Please fill in the URL." })
            // console.log(req.body.urlLink)
            const newUser = new Users({ urlLink, shorturlLink: generateUrl() })
            // inserts or saves into mongodb
            newUser.save(function (err, data) {
                if (err) throw err;

                res.json({ msg: "Register Success! Please activate your email to start." })
            })
        } catch (error) {
            res.status(500).json({ msg: "internal server error" })
        }
    },
    showUrl: async (req, res) => {
        try {
            let data = await Users.find()
            res.json(data)
        } catch (error) {
            res.status(500).json({ msg: "internal server error" })
        }
    },
    showUrlid: async (req, res) => {
        try {
            let urlData = await Users.findOne({ shorturlLink: req.params.urlId })
            console.log(urlData)
            Users.findByIdAndUpdate({ _id: urlData.id }, { $inc: { clickCount: 1 } }, function (err, updatedData) {
                if (err) throw err;
                res.redirect(urlData.urlLink)
            })
        } catch (error) {
            res.status(500).json({ msg: "internal server error" })
        }
    },
    deleteUrlid: async (req, res) => {
        try {
            let data = await Users.findByIdAndDelete({ _id: req.params.id })
            console.log(data)
            res.json({ msg: "delete Success" })
        } catch (error) {
            res.status(500).json({ msg: "internal server error" })
        }
    }

}


module.exports = urlModule