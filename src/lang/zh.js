import store from "../store/index"
export default {
    btn: {
        withdraw: "提現",
        connect: "鏈接錢包",
        buy: "購買",
        invite: "分享邀請",
        accept: "接受邀請",
        approve: "授權",
        download:'下載',
        copy:"複製",
        send:"發送",
        signin:"登錄",
        signup:"註冊",
        addToken:"添加代幣",
        save:"保存",
        update:"更新",
        claim:"提取獎勵"
    },
    text: {
        invite: "邀請",
        invited: "已邀請",
        level:"等級",
        staking:"質押",
        stake:"質押",
        unstaking:"取消質押",
        unstake:"取消質押",
        list:"列表",
        stakingfor:"質押",
        league:"合約",
        coming:"敬請期待",
        assets:"資產",
        profile:"個人信息",
        logout:"退出",
        changePassword:"修改密碼",
        resetPassword:"重置密碼",
        forgetPassword:"忘記密碼",
        changeEmail:"更換郵箱",
        connected: "已連接",
        welcome:"漢英來到 ",
        transaction:"交易列表",
        sending:"發送中",
        enter:"請輸入",
        email:"郵箱",
        password:"密碼",
        oldpassword:"舊密碼",
        newpassword:"新密碼",
        passwordagain:"重複密碼",
        again:"再次輸入",
        verifyCode:"驗證碼",
        balance: "餘額",
        earned: "已賺取",
        play: "遊戲",
        buy: "購買",
        exchange: "兌換",
        playing: "進行中",
        history: "歷史",
        amount: "數量",
        copy: "已複製",
        round: "輪數",
        players: "玩家",
        date: "日期",
        finishedText: "已經到底了",
        inviteLabel: "邀請碼",
        nodata: "数据为空！",
        language: "語言",
        clickcopy: "複製",
        rebate: "返利",
        reward: "獎勵",
        inviteNum: "邀請人數",
        allowance: "授權金額",
        exchangeTo: "轉換成",
        totalFund: "質押總數",
        wallet: "錢包",
        point: "積分",
        addToWallet:"添加至錢包",
        symbol:"符號",
        address:"地址",
        image:"圖片",
        currentallowance:"當前授權金額",
        setAmount:"設置金額",
        max:"最大",
        goforgame:"點擊鏈接，參與遊戲",
        gamePlayed:"參與遊戲數",
        createTime:"創建時間",
        updateTime:"更新時間",
        noaccount:"尚無賬號",
        hasaccount:"已有賬號",
        nickname:"昵称",
        profilesub:"查看或修改個人信息",
        registersub:"立即注册账号吧",
        evictitle:"Evics交易",
        tip:"提示",
        atleast:"至少提現",
        stop:"結束",
        pool:"池",
        contractAddress:"合約地址",
        actRules:"活動規則",
        starlight:"星光",
        club:"俱樂部",
        current:"當前",
        qualified:"資格",
        unqualified:"無資格",
        earning:"賺取",
        ownership:"所有權",
        starttime:"活動開始時間",
        lock:"鎖定期",
        return:"年轉化率"
    },
    message: {
        nickname:{
            length:"長度2-64字符之間",
            rule:"字母開頭，可以包含數字和_",
            nosame:"該暱稱已被使使用，請重新輸入"
        },
        email:{
            rule:"請輸入正確的郵箱格式",
            success:"更換郵箱成功"
        },
        password:{
            rule:"包含數字大小寫字母及特殊字符至少兩類",
            length:"長度8-64字符之間",
            newpassnosame:"不能設置相同的密碼，請重新輸入",
            nosame:"兩次輸入密碼不一致，請重新輸入",
            success:"修改密碼成功"
        },
        register:{
            success:"註冊成功！正在登陸... "
        },
        dashboard:{
            level:"不同等級邀請人數量",
            game:"當前參與遊戲數",
            cosd:"錢包COSD餘額",
            evic:"遊戲充值花費evic",
            nft:"獲取更多NFT"
        },
        play: {
            title: "参与8人对战",
            sub: "在遊戲中勝出將會贏得獎勵"
        },
        buy:{
            tip:"提示: USDT累積花費金額不超過"
        },
        wallet: {
            install: "請點擊鏈接下載Metamask錢包",
            connect: "錢包尚未連接，請鏈接！"
        },
        invite: {
            ad:"邀請更多用戶，您將獲得返利",
            share:"分享該鏈接即可邀請其他用戶",
            tip: "是否輸入邀請碼？",
            success: "操作成功",
            required: "邀請碼不能為空！",
            sub: "您將獲得 0.25% 的返利"
        },
        send:{
            exist:"該郵箱已被使註冊，請選擇其他郵箱",
            noexist:"該郵箱不存在",
            success:"驗證碼已發送至該郵箱，請注意查收",
            required:"郵箱不能為空"
        },
        chain: {
            error: "請您切換到正確的網絡 (Binance Smart Chain, ChainID=",
            tip: "請您切換到正確的網絡！'"
        },
        profile:{
            getwallet:"獲取當前錢包地址",
            view:"鏈上查看錢包"
        },
        evic:{
            limit:"最大數量不能超出餘額總數",
            success:"鏈上確認需要一些時間，請稍後刷新",
            atleast:"您至少需要提現"
        },
        defi:{
            limit:"最大數量不能超出餘額總數",
            reward:"COSD將作為獎勵",
            place:"提示：保留三位小數",
            reminder:"提示: 目前僅支持BSC(Binance smart chain)鏈，我們將盡快適配更多的網絡",
            stake:"您每次只能質押",
            lock:"當前仍在鎖定時間，不能質押",
            locktip:"當前仍在鎖定時間，不能進行該操作",
            rule:"活動開始後才可以質押，活動持續時間為30天。質押收入是按天計算的，年化收益率為52%，越早參與活動，收入越高。"
        }
    },
    require:{
        nickname:"昵称不能為空",
        email:"郵箱不能為空",
        password:"密碼不能為空",
        oldpassword:"舊密碼不能為空",
        newpassword:"新密碼不能為空",
        amount:"數量不能為空",
        verifyCode:"验证码不能為空"
    },
    error: {
        required: "數量不能為空!",
        reject: "您已拒絕了本次操作。",
        authorized: "賬戶或方法未授權。",
        wrong: "錢包發生錯誤，請檢車後重試。",
        wait: "錢包已有該操作請求，請優先處理！",
        failed: "操作失敗",
        wentWrong: "發生錯誤",
        exceed: "當前餘額過低，燃氣費用不足，可能導致提現失敗。",
        min: "交易數量不能小於最小金额。",
        max: "最大金额不能超出餘額。",
        allowance: "交易金额不能超出授權數量。",
        nosameuser:"您當前鏈接錢包非綁定錢包，是否更新為當前錢包？",
        isbinding:"是否為當前賬戶綁定該錢包地址？"
    },
    success:{
        bind:"綁定成功",
        success:"成功!\n最終確認需要一定的時間,如果餘額未刷新, 請稍後嘗試！"
    }
}