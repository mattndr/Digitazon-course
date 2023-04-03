// NOTA: creare un file per ogni esercizio

// Ex 1
// creare la funzione selector, che accetta una stringa in ingresso è in grado di stabilire se è un selettore CSS valido (selettore semplice, senza annidamenti), tra:
// - selettore di id
// - selettore di classe
// - selettore di un elemento tra div, span e img
// Se lo è, restituisce true, altrimenti false.
// In fase di chiamata, stampare un apposito messaggio in ouput, per ognuna delle seguenti chiamate:
// selector('#myDiv')  -> è un selettore valido, di id
// selector('.myDiv')  -> è un selettore valido, di classe
// selector('div')          -> è un selettore valido, di elemento div
// selector('paperino')  -> non è un selettore valido
// selector('ul')               -> non è un selettore valido (non è div, span o img)


function selector(str) {
    const htmlTags = ["a",
        "abbr",
        "acronym",
        "address",
        "applet",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "base",
        "basefont",
        "bdi",
        "bdo",
        "bgsound",
        "big",
        "blink",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "center",
        "cite",
        "code",
        "col",
        "colgroup",
        "content",
        "data",
        "datalist",
        "dd",
        "decorator",
        "del",
        "details",
        "dfn",
        "dir",
        "dl",
        "dt",
        "element",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "font",
        "footer",
        "form",
        "frame",
        "frameset",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hgroup",
        "hr",
        "html",
        "i",
        "iframe",
        "input",
        "ins",
        "isindex",
        "kbd",
        "keygen",
        "label",
        "legend",
        "li",
        "link",
        "listing",
        "main",
        "map",
        "mark",
        "marquee",
        "menu",
        "menuitem",
        "meta",
        "meter",
        "nav",
        "nobr",
        "noframes",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "plaintext",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "shadow",
        "small",
        "source",
        "spacer",
        "strike",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "template",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "title",
        "tr",
        "track",
        "tt",
        "u",
        "ul",
        "var",
        "video",
        "wbr",
        "xmp"]
    const validOutput = 'è un selettore valido, di ';
    const invalidOutput = 'non è un selettore valido ';
    if (typeof str == 'string' && str.length > 0) {
        if (str[0] == '#') console.log(validOutput + 'id');
        else if (str[0] == '.') console.log(validOutput + 'classe');
        else {
            if (str == 'div') console.log(validOutput + 'elemento div');
            else if (str == 'span') console.log(validOutput + 'elemento span');
            else if (str == 'img') console.log(validOutput + 'elemento img');
            else {
                let isHtmlTag = false;
                for (let i = 0; (i < htmlTags.length) && !isHtmlTag; i++) {
                    if (str == htmlTags[i]) isHtmlTag = true;
                }
                if (isHtmlTag) console.log(invalidOutput + '(non è div, span o img)');
                else console.log(invalidOutput);
            }
        }
    } else console.log(invalidOutput);
}


selector('#myDiv');
selector('.myDiv');
selector('div');
selector('paperino');
selector('ul');

console.log('------------------------------------------------------');