import store from "../store/index"
export default {
    btn: {
      withdraw:"withdraw",
      connect:"Connect Wallet",
      buy: "Buy",
      invite:"Share to invite",
      accept:"Accept Invitation",
      approve:"Approve Spending",
      download:'Download',
      copy:"Copy",
      send:"Send",
      signin:"Sign In",
      signup:"Sign Up",
      addToken:"Add Token",
      save:"Save",
      update:"Update",
      claim:"Claim rewards"
    },
    text:{
        invite:"Invite",
        invited: "Invited",
        level:"Level",
        staking:"Staking ",
        stake:"Stake",
        unstake:"Unstake",
        unstaking:"Unstaking ",
        stakingfor:"Staking For",
        league:"League",
        list:"List",
        coming:"coming soon",
        assets:"Assets",
        profile:"Profile",
        logout:"Sign Out",
        changePassword:"Change Password",
        resetPassword:"Reset Password",
        forgetPassword:"Forgot Password",
        changeEmail:"Change Email",
        connected:"Conected",
        welcome:"Welcome to ",
        transaction:"Transactions",
        sending:"Sending",
        enter:"enter your ",
        email:"email",
        password:"password",
        oldpassword:"Old password",
        newpassword:"New password",
        passwordagain:"New password again",
        again:"Repeat again",
        verifyCode:"Verify code",
        balance:"Balance",
        earned:"Earned",
        play:"Play",
        buy: "Buy",
        exchange:"Exchange",
        playing:"Playing",
        history:"History",
        amount:"Amount",
        copy:"Copyed",
        round:"Round",
        players:"Players",
        date:"Date",
        inviteLabel:"invite code",
        nodata: "No data !",
        language: "language",
        clickcopy: "copy",
        rebate: "rebate",
        reward: "Reward",
        inviteNum: "Invite Number",
        allowance: "Allowance",
        exchangeTo: "Exchange to",
        wallet:"Wallet",
        point:"Point",
        addToWallet:"Add to wallet",
        symbol:"Symbol",
        address:"Address",
        image:"Image",
        currentallowance:"Current approved allowance",
        setAmount:"Set amount",
        max:"Max",
        goforgame:"Click link and enjoy the game",
        gamePlayed:"Games played",
        createTime:"Create time",
        updateTime:"Update time",
        noaccount:"No account",
        hasaccount:"Already have an account",
        nickname:"Nickname",
        profilesub:"View or edit your profile",
        registersub:"Register your own account",
        evictitle:"Evics Transaction",
        tip:"TIP",
        atleast:"At least",
        stop:"Stop ",
        pool:"pool ",
        contractAddress:"contract address",
        actRules:"Activity Rules",
        starlight:"Starlight ",
        club:"Club ",
        current:"Current ",
        qualified:"Qualified",
        unqualified:"Unqualified",
        earning:"earning ",
        ownership:"ownership",
        starttime:"Activity Start Time",
        lock:"Lockup Period",
        return:"Annualized Return"
    },
    message:{
        nickname:{
            length:"The length between 2 and 64 character",
            rule:"Begin with a letter, and use letters, numbers and the underscore(_)",
            nosame:"this nick name has been used,please use another one"
        },
        email:{
            rule:"Please input correct email address",
            success:"The email has been changed successfully!"
        },
        password:{
            rule:"Contains at least two types of numbers, uppercase and lowercase letters, and special characters",
            length:"The length between 8 and 64 character",
            newpassnosame:"new password cannot be repeated, please re-enter",
            nosame:"The passwords are inconsistent, please re-enter",
            success:"The password has been changed successfully!"
        },
        register:{
            success:"Congratulations! You are ready for signing in! "
        },
        dashboard:{
            level:"The people that you invited is display by level",
            game:"View games remaining",
            cosd:"All COSD in your wallet",
            evic:"All Evics in the game",
            nft:"Get More NFTs"
        },
        play:{
            title:"Spend EVIC for a 8-players game",
            sub:"You will get paid if you win the game."
        },
        buy:{
            tip:"TIP: Accumulated expenses of usdt cannot exceed"
        },
        wallet:{
            install:"Please install Metamask Wallet at",
            connect:"please connect wallet"
        },
        invite:{
            ad:"Invite users to help you earn revenue",
            share:"share the image to invite user",
            tip:"Would you like to enter your invite code?",
            success:"success",
            required:"invite code is required!",
            sub:"You will receive a 0.25% reward！"
        },
        send:{
            exist:"this email has been used,please use another one",
            noexist:"this email is absent",
            success:"The verification code has been sent to your email!",
            required:"Email is required"
        },
        chain:{
            error:"Please connect to the right chain (Binance Smart Chain, ChainID=",
            tip:"'Sorry you need to switch to the right network, please try again!'"
        },
        profile:{
            getwallet:"get current wallet address",
            view:"View address on blockchain"
        },
        evic:{
            limit:"Sorry,the amount cannot exceed the balance!",
            success:"it will take a few minutes,please refresh later",
            atleast:"Sorry, you need to withdraw at least"
        },
        defi:{
            limit:"Sorry,the amount cannot exceed the balance!",
            reward:"COSD will be rewarded",
            place:"Tips: Retain 3 decimal places",
            reminder:"Reminder: BSC(Binance smart chain) chain supported only, we'll support various chains soon.",
            stake:"You can only stake",
            lock:"Sorry, stake is not allowed when locked!",
            locktip:"Sorry, this operation is not allowed when locked",
            rule:"Users can only stake after the event starts. The duration of the defi event is 30 days. The staking income is calculated on a daily basis, and the annual return rate is 52%, so the earlier you operate, the higher the income you will get."
        }
    },
    require:{
        nickname:"Nickname is required",
        email:"Email is required",
        password:"Password is required",
        oldpassword:"Old password is required",
        newpassword:"New password is required",
        amount:"Amount is required!",
        verifyCode:"Verify code is required!"
    },
    error:{
        required:"amount is required!",
        reject:"You have rejected this operation.",
        authorized:"The requested account and/or method has not been authorized.",
        wrong:"It seems that something wrong happens in your wallet, please check and solve it first.",
        wait:"The wallet is processing your request, please finish the operation in the wallet.",
        failed:"failed!",
        wentWrong:"Something went wrong.",
        exceed:"The current reward is less than the gas fee estimated",
        min:"The amount can not be less than",
        max:"The amount can not be more than balance",
        allowance:"The amount can not be more than allowance",
        nosameuser:"'The wallet address you connected is inconsistent with the wallet address bounded to user,would you like to update the wallet address?'",
        isbinding:"Would you like to bind the current wallet address to your account?"
    },
    success:{
        bind:"Bind successfully"
    }
  }