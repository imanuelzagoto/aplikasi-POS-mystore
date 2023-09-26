@extends('layouts.master')
@section('title')
    Categories List
@endsection
@section('breadcrum')
    @parent
@endsection
@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="box">
                <div class="box-header with-border">
                    <button class="btn btn-success btn-xs btn-flat"><i class="fa fa-plus-circle"></i> Add Data</button>
                </div>
                <div class="box-body table-responsive">
                    <table class="table table-stiped table-bordered">
                        <thead>
                            <th width="5%">No</th>
                            <th>Category</th>
                            <th width="15%"><i class="fa fa-cog"></i></th>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        let table;
        $(function() {
            $('.table').DataTable({
                processing: true;
                autoWidth: false;
                ajax: {
                    url: '{{ route('category.data') }}',
                }
            });
        });
    </script>
@endpush
