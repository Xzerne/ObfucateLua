const express = require('express');
const jsObfuscator = require('javascript-obfuscator');
const app = express();


app.get('/', (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'Lua code is required as a query parameter (e.g. ?code=your_code)' });
    }

    try {
        
        const decodedCode = decodeURIComponent(code);

        
        const headerComment = `
--[[
OTAKU IS UNBREAKABLE OBFUSCATOR

_toshun IS THE BEST!
--]]



`;

        
        
        const obfuscatedCode = jsObfuscator.obfuscate(decodedCode).getObfuscatedCode();
        const finalCode = headerComment + obfuscatedCode;
       
        res.json({ obfuscatedCode });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while obfuscating the code' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
