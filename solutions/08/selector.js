
function dig(node, sel) {
    'use strict';

    let res = [];

    // #id
    if (sel.indexOf('#') === 0) {
        sel = sel.slice(1);
        let t = node.getElementById(sel);
        if (t) {
            res.push(t);
        }
    }

    if (sel.indexOf('@') === -1) {
        res.push(...node.getElementsByTagName(sel));
    }

    // match tag name, attribute name, and desired attribute value
    var r = sel.match(/(\w+)\[@(\w+)\s*=\s*'(\w+)'/);

    if(r && r.length === 4) {
        let [ _, tag, att, aval ]  = r;
        let ir = node.getElementsByTagName(tag);

        if (ir.length) {
            ir = [].slice.call(ir);
            ir = ir.filter(el => el.getAttribute(att) == aval );
            res.push(...ir);
        }
    }

    return res;
}

function select(selector) {
    'use strict';
    let tokens = selector.split(/[\s\t]/);

    let rs = new Set([document]);
    let sel;

    while (sel = tokens.shift() ) {
        let newrs = new Set();

        rs.forEach((v, i) => {
            let res = dig(v, sel);
            res.forEach(e => newrs.add(e));
        });

        rs = newrs;
    }
}

select("div p[@x='baba'] span");
