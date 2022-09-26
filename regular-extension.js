// 正则的扩展

// RegExp 构造函数
// RegExp构造函数的参数有两种情况。
// 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

// 第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

// 但是，ES5 不允许此时使用第二个参数添加修饰符，否则会报错。
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
// 如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。
// 而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
new RegExp(/abc/ig, 'i').flags
// "i"
// 原有正则对象的修饰符是ig，它会被第二个参数i覆盖。

// 字符串的正则方法
// ES6 出现之前，字符串对象共有 4 个方法，
// 可以使用正则表达式：match()、replace()、search()和split()。
// ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，
// 从而做到所有与正则相关的方法，全都定义在RegExp对象上。
String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]



    // u 修饰符 
    // ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，
    // 用来正确处理大于\uFFFF的 Unicode 字符。
    // 也就是说，会正确处理四个字节的 UTF-16 编码。
    /^\uD83D / u.test('\uD83D\uDC2A') // false
        /^\uD83D /.test('\uD83D\uDC2A') // true
// \uD83D\uDC2A是一个四个字节的 UTF-16 编码，代表一个字符。
// 但是，ES5 不支持四个字节的 UTF-16 编码，
// 会将其识别为两个字符，导致第二行代码结果为true。
// 加了u修饰符以后，ES6 就会识别其为一个字符，所以第一行代码结果为false。
// 一旦加上u修饰符号，就会修改下面这些正则表达式的行为。

// 点字符
// 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。
// 对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
var s = '𠮷';

/^.$/.test(s) // false
    /^.$ / u.test(s) // true
    // 上面代码表示，如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。

    // Unicode 字符表示法
    // ES6 新增了使用大括号表示 Unicode 字符，
    // 这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词。
    / \u{61} /.test('a') // false
    / \u{61} / u.test('a') // true
    / \u{20BB7} / u.test('𠮷') // true
    // 上面代码表示，如果不加u修饰符，
    // 正则表达式无法识别\u{61}这种表示法，只会认为这匹配 61 个连续的u。

    // 量词
    // 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。
    / a{ 2 } /.test('aa') / / true
        / a{ 2 } /u.test('aa') / / true
            / 𠮷{ 2 } /.test('𠮷𠮷') / / false
                / 𠮷{ 2 } /u.test('𠮷𠮷') / / true
                    // 预定义模式
                    // u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符。
                    /^\S$ /.test('𠮷') // false
                        /^\S$ / u.test('𠮷') // true
// 上面代码的\S是预定义模式，
// 匹配所有非空白字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符。
// 利用这一点，可以写出一个正确返回字符串长度的函数。
function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2

    // i 修饰符
    // 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。
    / [a - z] / i.test('\u212A') // false
    / [a - z] / iu.test('\u212A') // true
    // 上面代码中，不加u修饰符，就无法识别非规范的K字符。

    // 转义
    // 没有u修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在u模式会报错。
    /\, / / / /\,/
        /\, /u / / 报错
// 上面代码中，没有u修饰符时，逗号前面的反斜杠是无效的，加了u修饰符就报错。

// RegExp.prototype.unicode 属性
// 正则实例对象新增unicode属性，表示是否设置了u修饰符。
const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true
// 上面代码中，正则表达式是否设置了u修饰符，可以从unicode属性看出来。

// y 修饰符
// 除了u修饰符，ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。
// y修饰符的作用与g修饰符类似，也是全局匹配，
// 后一次匹配都从上一次匹配成功的下一个位置开始。
// 不同之处在于，g修饰符只要剩余位置中存在匹配就可，
// 而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null

// 上面代码有两个正则表达式，一个使用g修饰符，
// 另一个使用y修饰符。这两个正则表达式各执行了两次，
// 第一次执行的时候，两者行为相同，剩余字符串都是_aa_a。
// 由于g修饰没有位置要求，所以第二次执行会返回结果，
// 而y修饰符要求匹配必须从头部开始，所以返回null。

// 如果改一下正则表达式，保证每次都能头部匹配，y修饰符就会返回结果了。
var s = 'aaa_aa_a';
var r = /a+_/y;

r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]
// 上面代码每次匹配，都是从剩余字符串的头部开始。
// 使用lastIndex属性，可以更好地说明y修饰符。
const REGEX = /a/g;

// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');

// 在3号位置匹配成功
match.index // 3

// 下一次匹配从4号位开始
REGEX.lastIndex // 4

// 4号位开始匹配失败
REGEX.exec('xaya') // null

// lastIndex属性指定每次搜索的开始位置，
// g修饰符从这个位置开始向后搜索，直到发现匹配为止。

// y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。
const REGEX = /a/y;

// 指定从2号位置开始匹配
REGEX.lastIndex = 2;

// 不是粘连，匹配失败
REGEX.exec('xaya') // null

// 指定从3号位置开始匹配
REGEX.lastIndex = 3;

// 3号位置是粘连，匹配成功
const match = REGEX.exec('xaya');
match.index // 3
REGEX.lastIndex // 4

    // y修饰符号隐含了头部匹配的标志^。

    / b / y.exec('aba')
// null
// 代码由于不能保证头部匹配，所以返回null。
// y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。
// 字符串对象的replace方法的例子。
const REGEX = /a/gy;
'aaxa'.replace(REGEX, '-') // '--xa'
// 最后一个a因为不是出现在下一次匹配的头部，所以不会被替换。

// 单单一个y修饰符对match方法，
// 只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配。
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]

// y修饰符的一个应用，是从字符串提取 token（词元），
// y修饰符确保了匹配之间不会有漏掉的字符。
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4')
// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4')
// [ '3', '+', '4' ]

function tokenize(TOKEN_REGEX, str) {
    let result = [];
    let match;
    while (match = TOKEN_REGEX.exec(str)) {
        result.push(match[1]);
    }
    return result;
}
tokenize(TOKEN_Y, '3x + 4')
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')
// [ '3', '+', '4' ]
// g修饰符会忽略非法字符，而y修饰符不会，这样就很容易发现错误。

// RegExp.prototype.sticky 属性 
// y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符。

// y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符。