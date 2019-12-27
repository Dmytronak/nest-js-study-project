import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { BookService } from 'src/shared/services/book.service';
import { GetFilteredBookView } from 'src/shared/view-models/book/get-all-book.view';
import { ResponseFilterBookView } from 'src/shared/view-models/book/filters/response-filter-book.view';
import { RequestFilterBookView } from 'src/shared/view-models/book/filters/request-filter.book.view';
import { FilteredBooksRequestView } from 'src/shared/view-models/book/filters/request-get-filtered-books.view';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get('/getCount')
    async getAllBooksCount(): Promise<number> {
        const response = await this.bookService.getAllBooksCount();
        return response;
    }

    @Post('/filterAutoComplete')
    async filterAutoComplete(@Body()requestFilterBookView:RequestFilterBookView): Promise<ResponseFilterBookView> {
        const response = await this.bookService.filterAutoComplete(requestFilterBookView);
        return response;
    }

    @Post('/filterByPriceRange')
    async filterByPriceRange(@Body()requestFilterBookView:RequestFilterBookView):Promise<ResponseFilterBookView>{
        return await this.bookService.filterByPriceRange(requestFilterBookView);
    }

    @Post('/filterByType')
    async filterByType(@Body()requestFilterBookView:RequestFilterBookView):Promise<ResponseFilterBookView>{
        return await this.bookService.filterByType(requestFilterBookView);
    }

    @Post('/getfilteredBooks')
    async getfilteredBooks(@Body()filteredBooksRequestView:FilteredBooksRequestView): Promise<GetFilteredBookView> {

        return await this.bookService.getFilteredBooks(filteredBooksRequestView);
    }
}
