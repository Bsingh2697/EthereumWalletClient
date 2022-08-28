export const STRING_CONSTANTS = {
    app_name:'ethWallet',
    permissions: {
    permission_required_text: 'Permission Required!',
    settings_text: 'Settings',
    cancel_text: 'Cancel',
    gallery_permission_text: 'To access Gallery please provide the Permission',
    camera_permission_text: 'To access Camera please provide the Permission',
    notification_permission_text:
      'To get Notifications please provide the Permission',
    no_camera_text: 'Camera cannot be accessed on this Device',
    no_gallery_text: 'Gallery cannot be accessed on this Device',
    no_notification_text: 'Notifications is not supported on this Device',
  },
    misc:{
        login_instead:"Login instead",
        ok_text: 'ok',
    },
    forms:{
        private_key: "Private Key",
        address: "Address",
        username: "Username",
        password: "Password",
        old_password: "Old Password",
        new_password: "New Password",
        old_username: "Old Username",
        new_username: "New Username",
    },
    errors:{
        // username
        usernameRequired: "Username is required",
        usernameRequiredMsg: "Username cannot be empty, please enter a valid username",
        usernameSmall :"Username too small",
        usernameSmallMsg:"Username cannot be less than 8 characters",
        invalidUsername:"Username too simple",
        invalidUsernameMsg:"Username must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one underscore, one special character and no space and it must be 8-16 characters long.",
        usernameExist:"Username already exists",
        usernameExistMsg: "Please try a different username",
        //Password
        passwordRequired: "Password is required",
        passwordRequiredMsg: "Password cannot be empty, please enter a valid password",
        passwordSmall :"Password too small",
        passwordSmallMsg:"Password cannot be less than 8 characters",
        invalidPassword:"Password too simple",
        invalidPasswordMsg:"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one underscore, one special character and no space and it must be 8-16 characters long.",
       // Address
       senderAddressInvalid:"Sender address is invalid",
       addressInvalid : "Receive address is invalid",
       // Ether
       ethValue:"Ether value is invalid",
       ethGas :"Ether gas is invalid",
       ethGasPrice:"Ether gas price is invalid",
       // Sell NFT
       fieldRequired:"Field required",
       fieldInvalid:"Field invalid",
       descriptionNftmsg:"Nft description is required!",
       priceRequiredmsg:"Nft price is required!",
       nameRequiredmsg:"Nft name is required!",
       descriptionNftmsglong:"Nft description cannot be longer than 100 characters!",
       priceRequiredmsglong:"Nft price is invalid!",
       nameRequiredmsglong:"Nft name cannot be longer than 24 characters!",
       nftRequired:"Nft required",
       nftRequiredMsg:"Please upload an NFT!",
       // GENERAL ERROR
       somethingWrong :"Something wrong happened!",
       pleaseTryAgain :"Please try again!",
    },
    buttons:{
        done: "Done",
        next: "Next",
    },
    labels:{
        label_login: "Login",
        label_signUp: "Sign Up",
        label_terms: "Terms and Conditions",
        label_privacy: "Privacy Policy",
        label_create_account: "Create Account",
        label_send: "Send",
        label_receive: "Receive",
        label_marketplace: "Marketplace",
        label_profile: "Profile",
    },
    blockchain:{
        label_nft: "NFT",
        label_ethereum: "Ethereum",
        label_ether: "Ether",
    },
    network:{
        network: "Network",
        main:"Main",
        test:"Test",
        ropsten:"Ropsten",
        kovan:"Kovan",
        rinkby:"Rinkby",
        goerli:"Goerli",
    },
    placeholders:{
        username: "Enter your username",
        password: "Enter your password",
    },
    messages:{
        bySigningUp:"By signing up,",
        youAgreeToOur:"you agree to our",
        and:"and",
        termsOfService:"Terms of Service",
    },
    ethForm:{
        address: "Address",
        ether: "Ether",
        from:"From",
        to:"To",
        value:"Value",
        gas: "Gas",
        gasPrice: "Gas Price",
    },
    transaction:{
        error:"Error",
        success:"Transaction Successful",
        failure:"Transaction Failed",
        pending:"Transaction Pending",
        confirmed:"Transaction Confirmation",
        confirmedBody:"Transaction has been confirmed",
        sent:"Transaction Sent",
        sending:"Sending Transaction",
        trackTransaction:"Track your transaction",
        transactionHash:"Transaction Hash",
    },
    sellNft:{
        price: "Price",
        description:"Description",
        name:"Name",
        ether:"eth",
    },
    toast:{
        // Upload to IPFS
        uploadStarted:"Uploading to IPFS!",
        uploadStartedmsg:"File is being uploading to IPFS!",
        uploadSuccessful:"Successfully Uploaded",
        uploadSuccessfulMsg:"NFT has been successfully uploaded to IPFS",
        uploadMetaDataToIpfsSuccessful:"NFT metadata has successfully uploaded to IPFS",
        insufficientFunds : "Insufficient funds",
        insufficientFundsMsg:"insufficient funds for gas * price + value",
        uploadToMarketplace:"Successful 🎉!",
        uploadToMarketplaceMsg:"Your NFT has been uploaded successfully!"
    },
}