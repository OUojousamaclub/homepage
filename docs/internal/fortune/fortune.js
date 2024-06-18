function stringToNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

class Random {
    constructor(seed = 88675123) {
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed;
    }

    // XorShift
    next() {
        let t;

        t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }
}

result_lst = [
    {
        fortune: '大凶',
        advice: '夜道に気をつけた方がよろしくってよ\nラッキーアイテム:出刃包丁'
    },
    {
        fortune: '大吉',
        advice: 'あとは落ちていくだけですわね\nラッキーアイテム:万国旗'
    },
    {
        fortune: '凶',
        advice: 'あなたより辛い人なんかいくらでもいるんだから我慢なさい\nラッキーアイテム:凄十'
    },
    {
        fortune: '凶',
        advice: 'せめて大凶ならもう少し話のネタになりましたのに\nラッキーアイテム:バター'
    },
    {
        fortune: '吉凶相交りて末吉',
        advice: '何言ってるんでしょうね\nラッキーアイテム:からしバター'
    },
    {
        fortune: '吉',
        advice: 'わざと面白げな誤字ツイートをするとちょっとだけバズりますわ\nラッキーアイテム:肉味噌'
    },
    {
        fortune: '大吉',
        advice: '█████に出会ってしまっても小指の爪を削ぐだけで済みますわ\nラッキーアイテム:憎い人の髪束'
    },
    {
        fortune:'中吉',
        advice:'洗濯ばさみの穴から仏間を覗いたことがおありかしら\nラッキーアイテム:小説版『カゲロウデイズ』2巻'
    }
]

document.getElementById('run').addEventListener('click', () => {
    name = document.getElementById('name').value
    today = '' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear()
    seed = stringToNumber(name + today);
    random = new Random(seed);
    value = random.next();

    idx = Math.abs(value) % (result_lst.length)

    result = result_lst[idx]
    console.log(result)
    document.getElementById('fortune').innerText = result['fortune']
    document.getElementById('advice').innerText = result['advice']

})