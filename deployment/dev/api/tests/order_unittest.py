import unittest

from app.models import order

class TestOrder(unittest.IsolatedAsyncioTestCase):
    async def test_add_order(self):
        orderItem={
            "order_code": "order_code157",
            "tracking_code": "",
            "shipper_id": 1,
            "shipper_name": "Shipper 1",
            "status": "draft_order",
            "pick_from": {
                "name": "Hải UTrans",
                "phone_number": "0932648515",
                "email": "truongchihai.tn70@gmail.com",
                "address": {
                    "address": "276/81/15 Thống Nhất",
                    "ward": "Phường 16",
                    "district": "Quận Gò Vấp",
                    "province": "TP Hồ Chí Minh",
                    "postcode": "700000"
                }
            },
            "pick_to": {
                "name": "Hải Genki",
                "phone_number": "0932648515",
                "email": "truongchihai.tn70@gmail.com",
                "address": {
                    "address": "168 Cao Đức Lân",
                    "ward": "An Phú",
                    "district": "Quận 2",
                    "province": "TP Hồ Chí Minh",
                    "postcode": "700000"
                }
            },
            "product": [
                {
                    "product_name": "str",
                    "product_code": "str",
                    "shop_location": "shop shop_location",
                    "weight": 1,
                    "quantity": 4
                }
            ]
        }
        await order.add_order(orderItem)
        self.assertTrue(True)

if __name__ == '__main__':
    unittest.main(verbosity=2)
