from celery import shared_task
import time

@shared_task
def add(x, y):
    print("Task started")
    time.sleep(5)
    print("Task done")
    return x + y
