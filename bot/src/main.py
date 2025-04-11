import threading

import uvicorn

from .setup.pyro_client import bot
from .setup.web import bot_backend, BOT_BACKEND_PORT
from . import handlers
from . import routes


def run_uvicorn() -> None:
    uvicorn.run(
        bot_backend, host='0.0.0.0', port=BOT_BACKEND_PORT, log_level='info',
    )


if __name__ == '__main__':
    threading.Thread(target=run_uvicorn, daemon=True).start()
    bot.run()
