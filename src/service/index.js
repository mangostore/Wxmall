import axios from 'axios'
import {apiUrl} from '../assets/js/config'

const fetch = (context = undefined, url = '', params = {}, method = 'GET') => {
  axios.defaults.baseURL = apiUrl
  axios.defaults.timeout = 5000
  axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
  axios.defaults.params = {
    'client': 'VM',
    'Authorization': context.userInfo && context.userInfo.Pwd,
    'UserBaseId': context.userInfo && context.userInfo.UserBase_ID
  }
  axios.defaults.transformResponse = [function (data) {
    data = JSON.parse(data)
    if (data.head.code === 10000) {
      return data.body.data
    } else {
      const toast = context.$createToast({
        type: 'warn',
        txt: data.head.message
      })
      toast.show()
      return false
    }
  }]
  return axios({url, params, method})
}

/**
 * 手机验证码
 */
export const mobileCode = (context, phone) => fetch(context, '/Handler/User.ashx?Action=getSmsForLogin', {
  Phone: phone
})

/**
 * 手机登录
 */
export const mobileLogin = (context, mobile, code) => fetch(context, '/Handler/User.ashx?Action=handleLoginBySms', {
  Phone: mobile,
  PhoCapt: code
}, 'POST')

/**
 * 账号登录
 */
export const accountLogin = (context, account, password) => fetch(context, '/Handler/User.ashx?Action=handleLoginByAccount', {
  Account: account,
  Password: password
}, 'POST')

/**
 * 收藏数量
 */
export const favoritesNum = (context) => fetch(context, '/Handler/Favorites.ashx?Action=GetFavoritesNum')

/**
 * 订单数
 */
export const orderList = (context, type, page) => fetch(context, '/Handler/Orders.ashx?Action=OrderList', {
  type: type,
  pageSize: 10,
  pageIndex: page
})

/**
 * 首页数据
 */
export const adList = (context, type) => fetch(context, '/Handler/Commodity.ashx?Action=getADList', {
  res: 1,
  DType: 0,
  staType: 'V',
  moduType: type
})

/**
 * 首页热门资讯
 */
export const newsList = (context) => fetch(context, '/Handler/NewsHandler.ashx?Action=GetNewsList', {
  pageSize: 8,
  pageIndex: 1
})

/**
 * 首页推荐商品
 */
export const hotProdList = (context) => fetch(context, '/Handler/Commodity.ashx?Action=getHotProdList')

/**
 * 商品列表
 */
export const productList = (context, pageIndex, keyword, SortType, Sort, CategoryID, BrandID, AttValueIds, PriceMin, PriceMax) => fetch(context, '/Handler/Commodity.ashx?Action=GetProdList', {
  pageSize: 10,
  pageIndex: pageIndex,
  keyword: keyword,
  SortType: SortType,
  Sort: Sort,
  CategoryID: CategoryID,
  BrandID: BrandID,
  AttValueIds: AttValueIds,
  PriceMin: PriceMin,
  PriceMax: PriceMax
})

/**
 * 筛选属性
 */
export const filterAttributes = (context, categoryId) => fetch(context, '/Handler/Commodity.ashx?Action=getAttrValueByCateID', {
  CategoryIDs: categoryId
})

/**
 * 商品详情
 */
export const productDetail = (context, productId) => fetch(context, '/Handler/ProduDetail.ashx?Action=ProduIntroduce', {
  ProduID: productId
})

/**
 * 库存信息
 */
export const productSkuInfo = (context, productId, attrs) => fetch(context, '/Handler/ProduDetail.ashx?Action=ProduSkuInfo', {
  ProduID: productId,
  ValueIDs: attrs
})

/**
 * 收货地址列表
 */
export const addressList = (context) => fetch(context, '/Handler/Address.ashx?Action=getAddressList', {
  PageSize: 99,
  PageIndex: 1
})

/**
 * 获取快递费用
 */
export const postageByAreaID = (context, productId, areaId) => fetch(context, '/Handler/ProduDetail.ashx?Action=GetStartFeeByAreaID', {
  ProduID: productId,
  AreaID: areaId
})

/**
 * 省市区级联数据
 */
export const allArea = (context) => fetch(context, '/Handler/Address.ashx?Action=GetAllArea')

/**
 * 商品评价
 */
export const productEvaluation = (context, productId, pageIndex, type) => fetch(context, '/Handler/Evaluation.ashx?Action=GoodsEvaList', {
  pageSize: 10,
  Produ_ID: productId,
  commentType: type,
  pageIndex: pageIndex
})

/**
 * 收藏商品
 */
export const productFavoriteAdd = (context, productId, productSkusId) => fetch(context, '/Handler/Favorites.ashx?Action=FavGoodsAdd', {
  Produ_id: productId,
  ProdSkus_ID: productSkusId
})

/**
 * 取消收藏商品
 */
export const productFavoriteDelete = (context, productId, productSkusId) => fetch(context, '/Handler/Favorites.ashx?Action=FavGoodsDelete', {
  Produ_id: productId,
  ProdSkus_ID: productSkusId
})

/**
 * 收藏店铺
 */
export const shopFavoriteAdd = (context, shopId) => fetch(context, '/Handler/Favorites.ashx?Action=FavShopAdd', {
  Shops_ID: shopId
})

/**
 * 取消收藏店铺
 */
export const shopFavoriteDelete = (context, shopId) => fetch(context, '/Handler/Favorites.ashx?Action=FavShopDelete', {
  Shops_ID: shopId
})

/**
 * 所有分类
 */
export const allSort = (context) => fetch(context, '/Handler/ProdCate.ashx?Action=AllCate')

/**
 * 购物车数量
 */
export const cartCount = (context) => fetch(context, '/Handler/CartHandler.ashx?Action=GetCartCount')

/**
 * 商品介绍
 * @param type Img:商品介绍 Para:参数详情 Cust:售后保障
 */
export const productIntroduction = (context, productId, type) => fetch(context, '/Handler/ProduDetail.ashx?Action=ProduIntroduce_' + type, {
  ProduID: productId
})

/**
 * 添加到购物车
 */
export const addToCartGetCount = (context, skuId, number, isLogin, expressName) => fetch(context, '/Handler/CartHandler.ashx?Action=AddToCart', {
  sku_id: skuId,
  number: number,
  islogin: isLogin,
  expressName: expressName
})

/**
 * 订单清单
 */
export const orderBookingList = (context, isBuyNow, addressId, skuId, numbers, expressName, isSelfTake, cartIds) => {
  if (isBuyNow) {
    return fetch(context, '/Handler/OrderConfirmHandler.ashx?Action=GetBookingList', {
      isBuyNow: isBuyNow,
      pageSize: 100,
      pageIndex: 1,
      addressid: addressId,
      skuId: skuId,
      numbers: numbers,
      expressName: expressName,
      IsSelfTake: isSelfTake
    })
  } else {
    return fetch(context, '/Handler/OrderConfirmHandler.ashx?Action=GetBookingList', {
      isBuyNow: isBuyNow,
      pageSize: 100,
      pageIndex: 1,
      addressid: addressId,
      cartIds: cartIds,
      IsSelfTake: isSelfTake
    })
  }
}

/**
 * 订单统计
 */
export const orderStatistics = (context, isBuyNow, addressId, skuId, buyNowNumber, expressName, isSelfTake, cartIds) => {
  if (isBuyNow) {
    return fetch(context, '/Handler/OrderConfirmHandler.ashx?Action=GetStatistics', {
      isBuyNow: isBuyNow,
      addressid: addressId,
      skuId: skuId,
      buyNowNumber: buyNowNumber,
      expressName: expressName,
      IsSelfTake: isSelfTake
    })
  } else {
    return fetch(context, '/Handler/OrderConfirmHandler.ashx?Action=GetStatistics', {
      isBuyNow: isBuyNow,
      addressid: addressId,
      cartIds: cartIds,
      IsSelfTake: isSelfTake
    })
  }
}

/**
 * 订单确认
 */
export const orderConfirm = (context, isBuyNow, message, payType, userAddreID, invoiceId, prodSkusID, numbers, expressName, isSelfTake) => fetch(context, '/Handler/OrderConfirmHandler.ashx?Action=Order_confirm', {
  isBuyNow: isBuyNow,
  message: message,
  payType: payType,
  userAddreID: userAddreID,
  invoiceid: invoiceId,
  ProdSkus_ID: prodSkusID,
  Numbers: numbers,
  expressName: expressName,
  IsSelfTake: isSelfTake
})

/**
 * 订单详情
 */
export const orderDetail = (context, ordersId) => fetch(context, '/Handler/Orders.ashx?Action=OrderDetail', {
  Orders_ID: ordersId
})

/**
 * 账户信息
 */
export const accountMsg = (context) => fetch(context, '/Handler/AccouMag.ashx?Action=GetRemainingSumInfo')

/**
 * 订单支付
 */
export const orderPay = (context, ordersId, payStyle, realPay, password) => fetch(context, '/Handler/Orders.ashx?Action=OrdPay', {
  Orders_ID: ordersId,
  IsSelfSupport: '',
  Paystyle: payStyle,
  TotalMoney: realPay,
  PayPwd: password,
  RetUrl: window.location.origin + '/mobile/WxWeb/WxPages/pay_succeed.aspx?ordIds=' + ordersId,
  NotifyUrl: window.location.origin + '/PayNotify/UmPay/SDK/order_notify.aspx'
})

/**
 * 支付成功
 */
export const paySuccess = (context, ordersId) => fetch(context, '/Handler/OrderConfirmHandler.ashx?Action=Pay_Success', {
  orders_ID: ordersId
})

/**
 * 商铺信息
 */
export const shopInfo = (context, shopId) => fetch(context, '/Handler/ShopHome.ashx?Action=ShopInfo', {
  ShopID: shopId
})

/**
 * 收藏店铺
 */
export const shopCollect = (context, shopId, state) => fetch(context, '/Handler/ShopHome.ashx?Action=ShopCollect', {
  ShopID: shopId,
  State: state
})

/**
 * 商铺首页
 */
export const shopRecom = (context, shopId) => fetch(context, '/Handler/ShopHome.ashx?Action=ShopRecom', {
  ShopID: shopId,
  PageIndex: 1,
  PageSize: 999
})

/**
 * 全部商品
 */
export const shopProductList = (context, shopId, type, order, page) => fetch(context, '/Handler/ShopHome.ashx?Action=ShopProd', {
  ShopID: shopId,
  SelectType: type,
  Order: order,
  PageIndex: page,
  pageSize: 10
})

/**
 * 商铺分类
 */
export const shopCate = (context, shopId) => fetch(context, '/Handler/ShopHome.ashx?Action=ShopCate', {
  ShopID: shopId
})

/**
 * 购物车列表
 */
export const cartList = (context) => fetch(context, '/Handler/CartHandler.ashx?Action=CartList', {
  pageIndex: 1,
  pageSize: 99
})
