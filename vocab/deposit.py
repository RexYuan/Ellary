#TODO: flags (edit), check dups
import json
import argparse

def styled(text, ts='', fc='', bc=''):
    if not (isinstance(text, str) and isinstance(ts, str) and isinstance(fc, str) and isinstance(bc, str)):
        raise Exception('All arguements must be strings. Use \'/\' to seperate multiple text_styles.')

    text_styles = ts.upper()
    foreground_color = fc.upper()
    background_color = bc.upper()

    RESET = '\033[0m'
    STYLE_OPTIONS = {
        'BOLD_ON': '\033[1m',
        'BOLD_OFF': '\033[22m',
        'ITALICS_ON': '\033[3m',
        'ITALICS_OFF': '\033[23m',
        'UNDERLINE_ON': '\033[4m',
        'UNDERLINE_OFF': '\033[24m',
        'STRIKETHROUGH_ON': '\033[9m',
        'STRIKETHROUGH_OFF': '\033[29m'
    }
    FOREGROUND_OPTIONS = {
        'BLACK': '\033[30m',
        'RED': '\033[31m',
        'GREEN': '\033[32m',
        'YELLOW': '\033[33m',
        'BLUE': '\033[34m',
        'MAGENTA': '\033[35m',
        'CYAN': '\033[36m',
        'WHITE': '\033[37m',
        'DEFAULT': '\033[39m'
    }
    BACKGROUND_OPTIONS = {
        'BLACK': '\033[40m',
        'RED': '\033[41m',
        'GREEN': '\033[42m',
        'YELLOW': '\033[43m',
        'BLUE': '\033[44m',
        'MAGENTA': '\033[45m',
        'CYAN': '\033[46m',
        'WHITE': '\033[47m',
        'DEFAULT': '\033[49m'
    }

    temp = text
    if text_styles:
        for s in text_styles.split('/'):
            if s+'_ON' in STYLE_OPTIONS:
                temp = STYLE_OPTIONS[(s+'_ON')] + temp + STYLE_OPTIONS[(s+'_OFF')]
            else:
                raise Exception('text_styles not found: ' + s)
    if foreground_color:
        if foreground_color in FOREGROUND_OPTIONS:
            temp = FOREGROUND_OPTIONS[foreground_color] + temp + FOREGROUND_OPTIONS['DEFAULT']
        else:
            raise Exception('foreground_color not found: ' + foreground_color)
    if background_color:
        if background_color in BACKGROUND_OPTIONS:
            temp = BACKGROUND_OPTIONS[background_color] + temp + BACKGROUND_OPTIONS['DEFAULT']
        else:
            raise Exception('background_color not found: ' + background_color)
    temp = RESET + temp + RESET
    return temp

def search(needle, haystack):
    for w in haystack:
        if w["question"] == needle:
            return w
    return False

def duplicate(needle, haystack):
    for w in haystack:
        if w["question"] == needle:
            return True

def match(needle, haystack):
    tmp = []
    for w in haystack:
        if needle in w["question"] or w["question"] in needle:
            tmp.append(w)
    return tmp

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-l", "--lookup", help="look up given word verbatim",
                        action="store_true")
    parser.add_argument("-m", "--match", help="read banked word",
                        action="store_true")
    parser.add_argument("--pop", help="pop last deposited word",
                        action="store_true")
    parser.add_argument("--delete", help="delete given word verbatim",
                        action="store_true")
    parser.add_argument("-r", "--read", help="read banked word",
                        action="store_true")
    args = parser.parse_args()

    if args.lookup:
        needle = input(styled("word: ", fc='YELLOW'))
        if needle == '':
            return styled("incomplete information!", fc='RED')
        with open("/Users/Rex/Ellary-examples/vocab/bank.js", "r") as fp:
            banked_words = json.loads(fp.read()[11:])
        result = search(needle, banked_words)
        if result:
            if 'info' in result:
                return styled('id:         {id}\nword:       {w}\ndefinition: {d}\nexample:    {s}'.format(id=result['id'], w=result['question'], d=result['answer'], s=result['info'].strip("\"")), fc='CYAN')
            else:
                return styled('id:         {id}\nword:       {w}\ndefinition: {d}'.format(id=result['id'], w=result['question'], d=result['answer']), fc='CYAN')
        else:
            return styled("word not found", fc='RED')
    elif args.match:
        needle = input(styled("word: ", fc='YELLOW'))
        if needle == '':
            return styled("incomplete information!", fc='RED')
        with open("/Users/Rex/Ellary-examples/vocab/bank.js", "r") as fp:
            banked_words = json.loads(fp.read()[11:])
        words = match(needle, banked_words)
        result = ''
        if words:
            for w in words:
                if 'info' in w:
                    result += 'id:         {id}\nword:       {w}\ndefinition: {d}\nexample:    {s}\n\n'.format(id=w['id'], w=w['question'], d=w['answer'], s=w['info'].strip("\""))
                else:
                    result += 'id:         {id}\nword:       {w}\ndefinition: {d}\n\n'.format(id=w['id'], w=w['question'], d=w['answer'])
            return styled(result.rstrip(), fc='CYAN')
        else:
            return styled("word not found", fc='RED')
    elif args.pop:
        with open("/Users/Rex/Ellary-examples/vocab/bank.js", "r+") as fp:
            banked_words = json.loads(fp.read()[11:])
            if len(banked_words) > 0:
                popped_word = banked_words.pop()
                fp.seek(11)
                fp.write(json.dumps(banked_words, indent=4))
                fp.truncate()
                return styled("popped "+popped_word['question'], fc='GREEN')
            else:
                return styled("nothing left", fc='RED')
    elif args.delete:
        needle = input(styled("word: ", fc='YELLOW'))
        if needle == '':
            return styled("incomplete information!", fc='RED')
        with open("/Users/Rex/Ellary-examples/vocab/bank.js", "r+") as fp:
            banked_words = json.loads(fp.read()[11:])
            result = search(needle, banked_words)
            if result:
                banked_words.remove(result)
                fp.seek(0)
                fp.truncate()
                fp.write("var bank = "+json.dumps(banked_words, indent=4))
                return styled("deleted "+needle, fc='GREEN')
            else:
                return styled("word not found", fc='RED')
    elif args.read:
        with open("/Users/Rex/Ellary-examples/vocab/bank.js", "r") as fp:
            banked_words = json.loads(fp.read()[11:])
            result = ''
            for w in banked_words:
                if 'info' in w:
                    print(type(w['info']))
                    result += 'id:         {id}\nword:       {w}\ndefinition: {d}\nexample:    {s}\n\n'.format(id=w['id'], w=w['question'], d=w['answer'], s=w['info'].strip("\""))
                else:
                    result += 'id:         {id}\nword:       {w}\ndefinition: {d}\n\n'.format(id=w['id'], w=w['question'], d=w['answer'])
            return styled(result.rstrip(), fc='CYAN')
    else:
        new_word       = input(styled("what's the word:      ", fc='YELLOW'))
        new_definition = input(styled("define it:            ", fc='YELLOW'))
        new_sentence   = input(styled("use it in a sentence: ", fc='YELLOW'))

        if new_word == '' or new_definition == '':
            return styled("incomplete information!", fc='RED')

        with open("/Users/Rex/Ellary-examples/vocab/bank.js", "a+") as fp:
            fp.seek(0)
            banked_words = json.loads(fp.read()[11:])

            if not duplicate(new_word, banked_words):
                banked_words.append({"id": len(banked_words),
                                     "question": new_word,
                                     "info": "\""+new_sentence+"\"",
                                     "answer": new_definition})
                fp.seek(0)
                fp.truncate()
                fp.write("var bank = "+json.dumps(banked_words, indent=4))
                return styled("banked " + new_word, fc='GREEN')
            else:
                return styled("dups!", fc='RED')

if __name__ == "__main__":
    print(main())
