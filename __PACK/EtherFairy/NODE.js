EtherFairy.CalculateManager=OBJECT({init:(t,e)=>{let n=e.calculateEXP=(t=>{let e=INTEGER(Date.now()/1e3)-t;return e}),a=e.calculateLevel=(t=>{let e=0,n=0;return REPEAT({start:1,end:9999},a=>{return e+=10*(a-1)*(a-1)*a,t>=e&&void(n=a)}),n}),i=e.calculateHP=(t=>{return 100*t}),r=e.calculateDamage=(t=>{return 5*t}),o=e.calculateDefencePercent=(t=>{return parseFloat((Math.log10(t*t)*Math.log10(t*t)).toFixed(2))}),y=e.calculateAttackSpeed=(t=>{return 100+t/2}),p=e.calculateAvoidability=(t=>{return t+=1,parseFloat((Math.log10(t*t)*Math.log10(t*t)/2).toFixed(2))}),u=e.calculateCriticalPercent=(t=>{return t+=1,parseFloat((Math.log10(t*t)*Math.log10(t*t)/2).toFixed(2))}),s=(t,e)=>{if("fire"===t){if("wind"===e)return 50;if("light"===e)return 25}if("water"===t){if("fire"===e)return 50;if("light"===e)return 25}if("wind"===t){if("earth"===e)return 50;if("light"===e)return 25}if("earth"===t){if("water"===e)return 50;if("light"===e)return 25}if("light"===t&&"dark"===e)return 100;if("dark"===t){if("fire"===e)return 25;if("water"===e)return 25;if("wind"===e)return 25;if("earth"===e)return 25}return 0},m=(t,e)=>{let n=0;return t.firePoint>0&&(e.firePoint>0&&(n+=s("fire","fire")),e.waterPoint>0&&(n+=s("fire","water")),e.windPoint>0&&(n+=s("fire","wind")),e.earthPoint>0&&(n+=s("fire","earth")),e.lightPoint>0&&(n+=s("fire","light")),e.darkPoint>0&&(n+=s("fire","dark"))),t.waterPoint>0&&(e.firePoint>0&&(n+=s("water","fire")),e.waterPoint>0&&(n+=s("water","water")),e.windPoint>0&&(n+=s("water","wind")),e.earthPoint>0&&(n+=s("water","earth")),e.lightPoint>0&&(n+=s("water","light")),e.darkPoint>0&&(n+=s("water","dark"))),t.windPoint>0&&(e.firePoint>0&&(n+=s("wind","fire")),e.waterPoint>0&&(n+=s("wind","water")),e.windPoint>0&&(n+=s("wind","wind")),e.earthPoint>0&&(n+=s("wind","earth")),e.lightPoint>0&&(n+=s("wind","light")),e.darkPoint>0&&(n+=s("wind","dark"))),t.earthPoint>0&&(e.firePoint>0&&(n+=s("earth","fire")),e.waterPoint>0&&(n+=s("earth","water")),e.windPoint>0&&(n+=s("earth","wind")),e.earthPoint>0&&(n+=s("earth","earth")),e.lightPoint>0&&(n+=s("earth","light")),e.darkPoint>0&&(n+=s("earth","dark"))),t.lightPoint>0&&(e.firePoint>0&&(n+=s("light","fire")),e.waterPoint>0&&(n+=s("light","water")),e.windPoint>0&&(n+=s("light","wind")),e.earthPoint>0&&(n+=s("light","earth")),e.lightPoint>0&&(n+=s("light","light")),e.darkPoint>0&&(n+=s("light","dark"))),t.darkPoint>0&&(e.firePoint>0&&(n+=s("dark","fire")),e.waterPoint>0&&(n+=s("dark","water")),e.windPoint>0&&(n+=s("dark","wind")),e.earthPoint>0&&(n+=s("dark","earth")),e.lightPoint>0&&(n+=s("dark","light")),e.darkPoint>0&&(n+=s("dark","dark"))),n},l=e.calculateElementDamage=(t=>{return 5*t}),d=(t,e)=>{let n=(r(t.attackPoint)+l(t.firePoint)+l(t.waterPoint)+l(t.windPoint)+l(t.earthPoint)+l(t.lightPoint)+l(t.darkPoint))*(100-o(e.defencePoint))/100*(1+m(t,e)/100),a=y(t.agilityPoint)/60*(100-p(e.dexterityPoint))/100;return n+=n*u(t.dexterityPoint)/100*10,{damage:n,turn:i(e.hpPoint)/(n*a)}};e.battle=(t=>{let e=COPY(t.fairyData),r=COPY(t.enemyData),o=a(n(e.birthTime))+e.appendedLevel,y=a(n(r.birthTime))+r.appendedLevel;e.hpPoint=e.hpPointPerLevel*o,e.attackPoint=e.attackPointPerLevel*o,e.defencePoint=e.defencePointPerLevel*o,e.agilityPoint=e.agilityPointPerLevel*o,e.dexterityPoint=e.dexterityPointPerLevel*o,e.firePoint=e.firePointPerLevel*o,e.waterPoint=e.waterPointPerLevel*o,e.windPoint=e.windPointPerLevel*o,e.earthPoint=e.earthPointPerLevel*o,e.lightPoint=e.lightPointPerLevel*o,e.darkPoint=e.darkPointPerLevel*o,r.hpPoint=r.hpPointPerLevel*o,r.attackPoint=r.attackPointPerLevel*o,r.defencePoint=r.defencePointPerLevel*o,r.agilityPoint=r.agilityPointPerLevel*o,r.dexterityPoint=r.dexterityPointPerLevel*o,r.firePoint=r.firePointPerLevel*o,r.waterPoint=r.waterPointPerLevel*o,r.windPoint=r.windPointPerLevel*o,r.earthPoint=r.earthPointPerLevel*o,r.lightPoint=r.lightPointPerLevel*o,r.darkPoint=r.darkPointPerLevel*o;let p=d(e,r),u=d(r,e);return{fairyLevel:o,enemyLevel:y,fairyHP:i(e.hpPoint),enemyHP:i(r.hpPoint),fairyDamage:p.damage,enemyDamage:u.damage,fairyTurn:p.turn,enemyTurn:u.turn,isWin:p.turn<=u.turn}})}}),EtherFairy.EtherFairyContract=OBJECT({preset:()=>{return Contract2Object},params:()=>{return{abi:[{constant:!0,inputs:[{name:"interfaceID",type:"bytes4"}],name:"supportsInterface",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"pauseService",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"masterToBlock",type:"address"}],name:"blockMaster",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"getApproved",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"fairyOriginPrice",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"approved",type:"address"},{name:"fairyId",type:"uint256"}],name:"approve",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"getFairyBasicPointsPerLevel",outputs:[{name:"hpPointPerLevel",type:"uint256"},{name:"attackPointPerLevel",type:"uint256"},{name:"defencePointPerLevel",type:"uint256"},{name:"agilityPointPerLevel",type:"uint256"},{name:"dexterityPointPerLevel",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseFirePointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"levelUpFairy",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"fairyIdToIsBlocked",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newTokenMetadataBaseURI",type:"string"}],name:"changeTokenMetadataBaseURI",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"officialMarket",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"fairyId",type:"uint256"}],name:"transferFrom",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"increasePointPricePerPoint",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fairyOriginId",type:"string"}],name:"getFairyIdsByOriginId",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getMasterIdsByFairyCount",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"fairyId",type:"uint256"}],name:"safeTransferFrom",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByBirthTime",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByAttackPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseDarkPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"servicePaused",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByAgilityPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyOriginId",type:"string"},{name:"designer",type:"address"},{name:"name",type:"string"},{name:"firePointPerLevel",type:"uint256"},{name:"waterPointPerLevel",type:"uint256"},{name:"windPointPerLevel",type:"uint256"},{name:"earthPointPerLevel",type:"uint256"},{name:"lightPointPerLevel",type:"uint256"},{name:"darkPointPerLevel",type:"uint256"}],name:"birthFairy",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseAttackPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByFirePointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"masters",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"ownerOf",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"fairyIdToMaster",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"address"}],name:"masterToIsBlocked",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"company",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"getFairyElementPointsPerLevel",outputs:[{name:"firePointPerLevel",type:"uint256"},{name:"waterPointPerLevel",type:"uint256"},{name:"windPointPerLevel",type:"uint256"},{name:"earthPointPerLevel",type:"uint256"},{name:"lightPointPerLevel",type:"uint256"},{name:"darkPointPerLevel",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newFairyOriginPrice",type:"uint256"}],name:"changeFairyOriginPrice",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"newCustomLevelUpPrice",type:"uint256"}],name:"changeCustomLevelUpPrice",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"master",type:"address"}],name:"balanceOf",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyIdToUnblock",type:"uint256"}],name:"unblockFairy",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"masterToUnlock",type:"address"}],name:"unblockMaster",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByWindPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseAgilityPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByWaterPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"operator",type:"address"},{name:"isApproved",type:"bool"}],name:"setApprovalForAll",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"NAME",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newOfficialMarket",type:"address"}],name:"changeOfficialMarket",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"address"},{name:"",type:"uint256"}],name:"masterToFairyIds",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"getFairyBasicInfo",outputs:[{name:"fairyOriginId",type:"string"},{name:"designer",type:"address"},{name:"name",type:"string"},{name:"birthTime",type:"uint256"},{name:"appendedLevel",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseDefencePointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"tokenMetadataBaseURI",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getMasterCount",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"from",type:"address"},{name:"to",type:"address"},{name:"fairyId",type:"uint256"},{name:"data",type:"bytes"}],name:"safeTransferFrom",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseEarthPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByHPPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyCount",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyIdToBlock",type:"uint256"}],name:"blockFairy",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByAppendedLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByDarkPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"tokenURI",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseLightPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseWindPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[],name:"resumeService",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"customLevelUpPrice",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByLightPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newIncreasePointPricePerPoint",type:"uint256"}],name:"changeIncreasePointPricePerPoint",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"master",type:"address"},{name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"},{name:"newName",type:"string"}],name:"changeFairyName",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"newCompany",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByEarthPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByDexterityPointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseDexterityPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"SYMBOL",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getFairyIdsByDefencePointPerLevel",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseHPPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[{name:"fairyOriginId",type:"string"}],name:"getFairyCountByOriginId",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"increaseWaterPointPerLevel",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"master",type:"address"},{indexed:!1,name:"fairyId",type:"uint256"}],name:"BirthFairy",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"},{indexed:!1,name:"name",type:"string"}],name:"ChangeFairyName",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"CustomLevelUp",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseHPPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseAttackPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseDefencePointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseAgilityPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseDexterityPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseFirePointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseWaterPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseWindPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseEarthPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseLightPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"IncreaseDarkPointPerLevel",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_from",type:"address"},{indexed:!0,name:"_to",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_owner",type:"address"},{indexed:!0,name:"_approved",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_owner",type:"address"},{indexed:!0,name:"_operator",type:"address"},{indexed:!1,name:"_approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"oldCompany",type:"address"},{indexed:!1,name:"newCompany",type:"address"}],name:"TransferOwnership",type:"event"},{anonymous:!1,inputs:[],name:"PauseService",type:"event"},{anonymous:!1,inputs:[],name:"ResumeService",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"price",type:"uint256"}],name:"ChangeFairyOriginPrice",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"price",type:"uint256"}],name:"ChangeCustomLevelUpPrice",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"price",type:"uint256"}],name:"ChangeIncreasePointPricePerPoint",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"tokenMetadataBaseURI",type:"string"}],name:"ChangeTokenMetadataBaseURI",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"officialMarket",type:"address"}],name:"ChangeOfficialMarket",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"masterToBlock",type:"address"}],name:"BlockMaster",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"fairyIdToBlock",type:"uint256"}],name:"BlockFairy",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"masterToUnlock",type:"address"}],name:"UnblockMaster",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"fairyIdToUnblock",type:"uint256"}],name:"UnblockFairy",type:"event"}],address:CONFIG.isTestnetMode!==!0?"0xb6d80A462a40B39dA0A0D0F7101ec97F52A9Ef24":"0x1fdc1459d4c296d1e6e4aa231a733e87069f23c9"}}}),EtherFairy.FairyMarketContract=OBJECT({preset:()=>{return Contract2Object},params:()=>{return{abi:[{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"findSaleIdByFairyId",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"marketPaused",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"nft",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"company",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"fairyId",type:"uint256"}],name:"checkFairyForSale",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"resumeMarket",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[],name:"pauseMarket",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"sales",outputs:[{name:"seller",type:"address"},{name:"fairyId",type:"uint256"},{name:"price",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"cancelSale",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"getSaleCount",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"}],name:"buy",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"newCompany",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"fairyId",type:"uint256"},{name:"price",type:"uint256"}],name:"startSale",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"candidateNFTAddress",type:"address"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"},{indexed:!1,name:"price",type:"uint256"}],name:"StartSale",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"originSaleId",type:"uint256"},{indexed:!1,name:"newSaleId",type:"uint256"}],name:"ChangeSaleId",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"}],name:"CancelSale",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"fairyId",type:"uint256"},{indexed:!1,name:"price",type:"uint256"}],name:"SuccessSale",type:"event"},{anonymous:!1,inputs:[{indexed:!1,name:"oldCompany",type:"address"},{indexed:!1,name:"newCompany",type:"address"}],name:"TransferOwnership",type:"event"},{anonymous:!1,inputs:[],name:"PauseMarket",type:"event"},{anonymous:!1,inputs:[],name:"ResumeMarket",type:"event"}],address:CONFIG.isTestnetMode!==!0?"0x33CC87c79615EC984E13af746737839c3966aC88":"0x143389d52410ba2bfeeecb1a502cec58e49df006"}}}),EtherFairy.BattleResultModel=OBJECT({preset:()=>{return EtherFairy.MODEL},params:()=>{return{name:"BattleResult",methodConfig:{create:!1,update:!1,remove:!1}}}}),EtherFairy.DesignerIdentityModel=OBJECT({preset:()=>{return EtherFairy.MODEL},params:()=>{let t={adminPassword:!0,name:{notEmpty:!0},email:{notEmpty:!0,size:{min:5,max:320},email:!0},phoneNumber:{notEmpty:!0}};return{name:"DesignerIdentity",methodConfig:{create:{valid:VALID(t)},update:!1,remove:!1}}}}),EtherFairy.DesignerModel=OBJECT({preset:()=>{return EtherFairy.MODEL},params:()=>{let t={identityCode:{notEmpty:!0,id:!0},walletAddress:{size:42},username:{notEmpty:!0,size:{min:4,max:20},username:!0},nickname:{notEmpty:!0,size:{min:1,max:20}},email:{notEmpty:!0,size:{min:5,max:320},email:!0},password:{notEmpty:!0,size:{min:4,max:20}},loginCount:{notEmpty:!0,integer:!0},lastLoginTime:{date:!0},isAgreedTerms:{notEmpty:!0,equal:!0},isAgreedPrivacy:{notEmpty:!0,equal:!0},language:{size:{max:5}},roles:{array:!0},profileImageFileId:{id:!0}};return{name:"Designer",initData:{loginCount:0},methodConfig:{create:{valid:VALID(t)},update:{valid:VALID(t),authKey:"id",role:EtherFairy.ROLE.DESIGNER,adminRole:EtherFairy.ROLE.ADMIN},remove:!1},loginValid:VALID({username:t.username,password:t.password,language:t.language})}}}),EtherFairy.FairyModel=OBJECT({preset:()=>{return EtherFairy.MODEL},params:()=>{let t={id:{notEmpty:!0,integer:!0},fairyOriginId:{notEmpty:!0,id:!0},designer:{notEmpty:!0},name:{notEmpty:!0},birthTime:{notEmpty:!0,integer:!0},appendedLevel:{notEmpty:!0,integer:!0},hpPointPerLevel:{notEmpty:!0,integer:!0},attackPointPerLevel:{notEmpty:!0,integer:!0},defencePointPerLevel:{notEmpty:!0,integer:!0},agilityPointPerLevel:{notEmpty:!0,integer:!0},dexterityPointPerLevel:{notEmpty:!0,integer:!0},firePointPerLevel:{notEmpty:!0,integer:!0},waterPointPerLevel:{notEmpty:!0,integer:!0},windPointPerLevel:{notEmpty:!0,integer:!0},earthPointPerLevel:{notEmpty:!0,integer:!0},lightPointPerLevel:{notEmpty:!0,integer:!0},darkPointPerLevel:{notEmpty:!0,integer:!0},rating:{notEmpty:!0,integer:!0},lastEnemyFairyId:{id:!0},winningStreak:{notEmpty:!0,integer:!0},losingStreak:{notEmpty:!0,integer:!0}};return{name:"Fairy",initData:{rating:0,winningStreak:0,losingStreak:0},isNotUsingObjectId:!0,methodConfig:{create:{valid:VALID(t)},update:{valid:VALID(t)},remove:!1}}}}),EtherFairy.FairyOriginModel=OBJECT({preset:()=>{return EtherFairy.MODEL},params:()=>{let t={designerId:{notEmpty:!0,id:!0},name:{notEmpty:!0,size:{min:1,max:20}},description:{notEmpty:!0,size:{max:3e3}},imageFileId:{notEmpty:!0,id:!0},firePointPerLevel:{notEmpty:!0,integer:!0},waterPointPerLevel:{notEmpty:!0,integer:!0},windPointPerLevel:{notEmpty:!0,integer:!0},earthPointPerLevel:{notEmpty:!0,integer:!0},lightPointPerLevel:{notEmpty:!0,integer:!0},darkPointPerLevel:{notEmpty:!0,integer:!0},isInReview:{bool:!0},publishTime:{date:!0},isPublished:{bool:!0}};return{name:"FairyOrigin",methodConfig:{create:{valid:VALID(t),authKey:"designerId"},update:{valid:VALID(t),authKey:"designerId",adminRole:EtherFairy.ROLE.ADMIN},remove:!1}}}}),EtherFairy.MasterModel=OBJECT({preset:()=>{return EtherFairy.MODEL},params:()=>{let t={id:{notEmpty:!0,size:42},nickname:{notEmpty:!0,size:{min:1,max:20}},isAgreedTerms:{notEmpty:!0,equal:!0},isAgreedPrivacy:{notEmpty:!0,equal:!0},language:{size:{max:5}},profileImageFileId:{id:!0},fairyCount:{notEmpty:!0,integer:!0},totalFairyLevel:{notEmpty:!0,integer:!0},totalFairyRating:{notEmpty:!0,integer:!0}};return{name:"Master",isNotUsingObjectId:!0,initData:{fairyCount:0,totalFairyLevel:0,totalFairyRating:0},methodConfig:{create:{valid:VALID(t)},update:{valid:VALID(t)},remove:!1}}}}),EtherFairy("ROLE").ADMIN="Admin",EtherFairy("ROLE").DESIGNER="Designer";EtherFairy.AdminRoom=OBJECT({init:(e,i)=>{EtherFairy.ROOM("Admin",(e,i,r)=>{()=>{return void 0!==e&&void 0!==e.roles&&CHECK_IS_IN({array:e.roles,value:EtherFairy.ROLE.ADMIN})===!0};i("auth",(i,r)=>{i===NODE_CONFIG.EtherFairy.adminPassword?(e.roles=[EtherFairy.ROLE.USER,EtherFairy.ROLE.ADMIN],r(i===NODE_CONFIG.EtherFairy.adminPassword)):r(!1)})})}}),EtherFairy.MAIN=METHOD({run:e=>{if(1===CPU_CLUSTERING.getWorkerId()){let e=e=>{let i={};PARALLEL([r=>{EtherFairy.EtherFairyContract.getFairyBasicInfo(e,(e,t,n,a,o)=>{i.fairyOriginId=e,i.designer=t,i.name=n,i.birthTime=a,i.appendedLevel=o,r()})},r=>{EtherFairy.EtherFairyContract.getFairyBasicPointsPerLevel(e,(e,t,n,a,o)=>{i.hpPointPerLevel=e,i.attackPointPerLevel=t,i.defencePointPerLevel=n,i.agilityPointPerLevel=a,i.dexterityPointPerLevel=o,r()})},r=>{EtherFairy.EtherFairyContract.getFairyElementPointsPerLevel(e,(e,t,n,a,o,s)=>{i.firePointPerLevel=e,i.waterPointPerLevel=t,i.windPointPerLevel=n,i.earthPointPerLevel=a,i.lightPointPerLevel=o,i.darkPointPerLevel=s,r()})},()=>{i.id=e,EtherFairy.FairyModel.get(e,{notExists:()=>{EtherFairy.FairyModel.create(i),EtherFairy.EtherFairyContract.ownerOf(e,e=>{EtherFairy.MasterModel.update({id:e.toLowerCase(),$inc:{fairyCount:1}})})},success:()=>{EtherFairy.FairyModel.update(i)}})}])};EtherFairy.EtherFairyContract.getFairyCount(i=>{REPEAT(i,i=>{e(i)})}),EtherFairy.EtherFairyContract.on("BirthFairy",i=>{e(i.fairyId)}),INTERVAL(600,()=>{EtherFairy.FairyModel.find({isFindAll:!0},e=>{EACH(e,e=>{EtherFairy.FairyModel.get({filter:{id:{$ne:[e.id,e.lastEnemyFairyId]},rating:{$gte:e.rating-100,$lte:e.rating+100}},isRandom:!0},{notExists:()=>{},success:i=>{let r=EtherFairy.CalculateManager.battle({fairyData:e,enemyData:i});if(r.fairyId=e.id,r.enemyId=i.id,r.isWin===!0){let t=10+3*e.winningStreak;r.fairyRatingChange=t,EtherFairy.FairyModel.update({id:e.id,$inc:{rating:t,winningStreak:1},losingStreak:0});let n=10+3*i.losingStreak;r.enemyRatingChange=-n,EtherFairy.FairyModel.update({id:i.id,$inc:{rating:i.rating<n?-i.rating:-n,losingStreak:1},winningStreak:0},e=>{e.rating<0&&EtherFairy.FairyModel.update({id:e.id,rating:0})})}else{let t=10+3*i.winningStreak;r.enemyRatingChange=t,EtherFairy.FairyModel.update({id:i.id,$inc:{rating:t,winningStreak:1},losingStreak:0});let n=10+3*e.losingStreak;r.fairyRatingChange=-n,EtherFairy.FairyModel.update({id:e.id,$inc:{rating:e.rating<n?-e.rating:-n,losingStreak:1},winningStreak:0},e=>{e.rating<0&&EtherFairy.FairyModel.update({id:e.id,rating:0})})}EtherFairy.BattleResultModel.create(r)}})})})})}}}),OVERRIDE(EtherFairy.DesignerIdentityModel,e=>{EtherFairy.DesignerIdentityModel=OBJECT({preset:()=>{return e},init:(e,i,r)=>{i.getDB();e.on("create",{before:(e,i,r,t)=>{return e.adminPassword!==NODE_CONFIG.EtherFairy.adminPassword?(r({validErrors:{adminPassword:{type:"wrong"}}}),!1):void delete e.adminPassword}})}})}),OVERRIDE(EtherFairy.DesignerModel,e=>{EtherFairy.DesignerModel=OBJECT({preset:()=>{return e},init:(e,i,r)=>{const t=["","about","join","login","oauth","logout","apps","admin","administrator","master","gamemaster","webmaster"];let n=r.loginValid,a=(i.getDB(),EtherFairy.DB("RememberMe")),o=e=>{delete e.password,delete e.ip,delete e.isAgreedTerms,delete e.isAgreedPrivacy};e.on("create",{before:(e,r,n,a)=>{let o=e.username;if(CHECK_IS_IN({array:t,value:o})===!0)n({validErrors:{username:{type:"notAllowed"}}});else{let t=e.password;i.checkExists({filter:{username:o}},i=>{i===!0?n({validErrors:{username:{type:"existed"}}}):EtherFairy.DesignerIdentityModel.get(e.identityCode,()=>{void 0!==a&&(e.ip=a.ip),e.password=SHA256({key:o,password:t}),e.roles=[EtherFairy.ROLE.DESIGNER],r()})})}return!1},after:e=>{o(e)}}),e.on("update",{before:(e,r,n,a)=>{let o=e.username;if(CHECK_IS_IN({array:t,value:o})===!0)n({validErrors:{username:{type:"notAllowed"}}});else{let t=e.password;void 0!==a&&(e.ip=a.ip),i.get(e.id,a=>{e.username===a.username?(void 0!==e.password&&(e.password=SHA256({key:o,password:t})),r()):void 0!==e.username?i.checkExists({filter:{username:o}},i=>{i===!0?n({validErrors:{username:{type:"existed"}}}):(void 0!==e.password&&(e.password=SHA256({key:o,password:t})),r())}):void 0!==e.password?(e.password=SHA256({key:a.username,password:t}),r()):r()})}return!1},after:e=>{o(e)}}),e.on("get",e=>{o(e)}),e.on("find",EACH(e=>{o(e)})),EtherFairy.ROOM(i.getName(),(e,r)=>{r("login",(r,t)=>{if(void 0!==r){let s=n.checkAndWash(r);if(s.checkHasError()===!0)t({validErrors:s.getErrors()});else{let n=r.username,s=r.password;s=SHA256({key:n,password:s}),i.get({filter:{username:n,password:s}},{notExists:()=>{t({validErrors:{username:{type:"login"}}})},success:n=>{e.roles=n.roles,e.authKey=n.id,i.updateNoHistory({id:n.id,language:r.language,lastLoginTime:new Date,$inc:{loginCount:1}},e=>{a.create({userId:n.id},i=>{o(e),t({savedData:e,rememberMeKey:i.id})})})}})}}}),r("resign",(r,t)=>{void 0!==r&&a.get(r,{notExists:()=>{t()},success:r=>{i.get(r.userId,i=>{e.roles=i.roles,e.authKey=i.id,o(i),t(i)})}})}),r("logout",(i,r)=>{void 0!==i&&a.get(i,{notExists:()=>{r()},success:t=>{t.userId===e.authKey&&(e.roles=void 0,e.authKey=void 0,a.remove(i,()=>{r()}))}})})})}})}),OVERRIDE(EtherFairy.FairyOriginModel,e=>{EtherFairy.FairyOriginModel=OBJECT({preset:()=>{return e},init:(e,i,r)=>{e.on("create",{before:(e,i,r)=>{if(e.firePointPerLevel+e.waterPointPerLevel+e.windPointPerLevel+e.earthPointPerLevel+e.lightPointPerLevel+e.darkPointPerLevel!==5)return r({validErrors:{firePointPerLevel:{type:"totalPointIsNot5"}}}),!1}})}})});