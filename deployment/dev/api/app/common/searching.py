from app.core.response import PagingSearch

def pagingGen(page_size, current_page, total_rows):
    total_pages = total_rows / page_size
    mod = total_rows % page_size
    if mod > 0:
        total_pages = total_pages+1
    return PagingSearch(total_pages=total_pages,
                        total_rows=total_rows,
                        current_page=current_page, 
                        page_size=page_size)
