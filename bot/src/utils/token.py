import base64
import binascii
import logging


logger = logging.getLogger(__name__)


def ids_to_token(user_id: int, msg_id: int) -> str:
    bytes_token = f'{user_id}|{msg_id}'.encode()
    return base64.b64encode(bytes_token).decode()


def token_to_ids(token: str) -> tuple[int, int]:
    try:
        bytes_token = base64.b64decode(token)
    except binascii.Error:
        logger.exception('Не удалось декодировать токен: %s', token)
        return 0, 0

    user_id, msg_id = bytes_token.split(b'|')
    if not (user_id.isdigit() and msg_id.isdigit()):
        logger.warning(
            'Токен содержит неверные данные:\nuser_id = %s\nmsg_id = %s', 
            user_id, msg_id
        )
        return 0, 0

    logger.info(
        'Обработан токен с данными:\nuser_id = %s\nmsg_id = %s', 
        user_id, msg_id
    )
    return int(user_id), int(msg_id)
