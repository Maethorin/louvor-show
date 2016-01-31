# -*- coding: utf-8 -*-


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')
